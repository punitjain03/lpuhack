// value ranges
// rain_probability: 0 - 100
// crop_water_needs: 0 - 10
// soil_moisture: 0 - 100

const waterManagement = (
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
let res = waterManagement(50, 7, 60);
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
