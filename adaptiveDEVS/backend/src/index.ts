import axios, { AxiosRequestConfig } from 'axios';
import express from 'express';
import dotenv from 'dotenv';
import { EventEmitter } from 'events';
dotenv.config();

import { corsMiddleware } from './middlewares';
import { writeFileSync } from 'fs';
const app = express();

app.use(corsMiddleware);
app.use(express.json());

const PORT = process.env.PORT || 5000;
const AZURE_WEATHER_API_KEY = process.env.AZURE_WEATHER_API_KEY;

const nodemcuEvents = new EventEmitter();

let currentSoilMoisture = 0;
app.get('/test', (req, res) => {
  res.end('working');
});
app.post('/nodemcu', (req, res) => {
  const { body } = req;
  console.log({ body });
  const { moisture } = body;
  currentSoilMoisture = moisture;
  nodemcuEvents.emit('nodemcu-event', moisture);

  res.status(200).end();
});

const getWeatherData = async (lat: number | string, lon: number | string) => {
  const url = `https://atlas.microsoft.com/weather/forecast/daily/json?api-version=1.0&query=${lat},${lon}&subscription-key=${AZURE_WEATHER_API_KEY}&duration=1`;
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: url,
  };

  return axios(options)
    .then(function (response) {
      const { forecasts } = response.data;
      const { day } = forecasts[0];
      const { rainProbability } = day;
      return {
        rainProbability,
      };
    })
    .catch(function (error) {
      return error;
      // res.status(500).json(error);
    });
};

const shouldWaterEstimator = (
  rainProbability: number,
  crop: 'rice' | 'wheat' | 'tomato'
) => {
  let shouldWater = false;

  switch (crop) {
    case 'rice':
      shouldWater = shouldWaterTheField(
        rainProbability,
        crops.rice.water_need,
        currentSoilMoisture
      );
      return { shouldWater };

    case 'wheat':
      shouldWater = shouldWaterTheField(
        rainProbability,
        crops.wheat.water_need,
        currentSoilMoisture
      );
      return { shouldWater };
    case 'tomato':
      shouldWater = shouldWaterTheField(
        rainProbability,
        crops.tomato.water_need,
        currentSoilMoisture
      );
      return { shouldWater };
    // return res.json({ shouldWater }).end();
  }
};

app.post('/farmerData', (req, res) => {
  const { name, lat, lon, crop } = req.body;
  console.log(req.body);
  getWeatherData(lat, lon)
    .then((rainProbability) => {
      const shouldWater = shouldWaterEstimator(
        rainProbability.rainProbability,
        crop
      );

      res.json({ shouldWater }).end();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get('/updates/:lat/:lon/:crop/', async (req, res) => {
  const { rainProbability } = await getWeatherData(
    req.params.lat,
    req.params.lon
  );

  const shouldWater = shouldWaterEstimator(
    rainProbability,
    req.params.crop as 'tomato'
  );

  res
    .json({
      rainProbability,
      shouldWater,
      currentSoilMoisture,
    })
    .end();
});

// })

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// value ranges
// rain_probability: 0 - 100
// crop_water_needs: 0 - 10
// soil_moisture: 0 - 100

const shouldWaterTheField = (
  rain_probability: number,
  crop_water_needs: number,
  soil_moisture
) => {
  // return values; true - water need, false - no water need

  let critical_min = 0;
  let critical_max = 0;
  let ideal_min = 0;
  let ideal_max = 0;

  if (crop_water_needs >= 7) {
    //   example - rice
    critical_min = 50;
    critical_max = 90;
    ideal_min = 70;
    ideal_max = 80;
  } else if (crop_water_needs >= 5 && crop_water_needs < 7) {
    critical_min = 30;
    critical_max = 80;
    ideal_min = 40;
    ideal_max = 60;
  } else if (crop_water_needs >= 3 && crop_water_needs < 5) {
    critical_min = 10;
    critical_max = 70;
    ideal_min = 20;
    ideal_max = 40;
  }

  if (soil_moisture >= critical_max) {
    return false;
  } else if (soil_moisture < critical_min) {
    return true;
  } else if (soil_moisture >= ideal_min && soil_moisture < ideal_max) {
    if (rain_probability <= 30) {
      return true;
    } else {
      return false;
    }
  } else if (soil_moisture >= critical_min && soil_moisture < ideal_min) {
    if (rain_probability >= 80) {
      return false;
    } else {
      return true;
    }
  }
};

// rain, crop, soil
let res = shouldWaterTheField(50, 7, 60);
console.log(res);

let crops = {
  rice: {
    water_need: 8,
  },
  wheat: {
    water_need: 6,
  },
  tomato: {
    water_need: 3,
  },
};
