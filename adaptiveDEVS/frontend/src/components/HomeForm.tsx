// @ts-nocheck

import React, { useState } from 'react';
import {
  createStyles,
  Select,
  TextInput,
  Button,
  NumberInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { DatePicker } from '@mantine/dates';
import useGeolocation from 'react-hook-geolocation';
import api from 'src/api';
import { Stats } from './Stats';
import { useLocalStorage } from '@mantine/hooks';
import GMAP from './GMaps';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: 'auto',
    paddingTop: 18,
    margin: '20 0',
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

export function HomeForm() {
  // You can add these classes as classNames to any Mantine input, it will work the same
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      name: '',
      lat: 0.0,
      lon: 0.0,
      crop: '',
    },
  });

  const farmerDataKey = 'farmer-data';

  const [value, setValue] = useLocalStorage({
    key: farmerDataKey,
    defaultValue: { crop: '', lat: '', lon: '' },
    serialize: (value) => {
      // /* return value serialized to string */
      return JSON.stringify(value);
    },
    deserialize: (localStorageValue) => {
      return JSON.parse(localStorageValue);
      /* parse localStorage string value and return value */
    },
  });

  // const [gotResponse, setGotResponse] = useState(false)
  const [response, setResponse] = useState(false);

  if (response) {
    return <Stats crop={value?.crop} lat={value?.lat} lon={value?.lon} />;
  }

  // const getGeoLocation = () => {
  //   const geoLocation = useGeolocation();

  //   return geoLocation;
  // };

  return (
    <div>
      {/* <GMAP /> */}
      <form
        onSubmit={form.onSubmit((values) => {
          console.log({ values });
          setValue(values as any);
          api.submitFarmerData(values).then(() => {
            // setResponse()
            setResponse(true);
          });
        })}
      >
        <TextInput
          label="Name of Farmer"
          placeholder="Please enter your name"
          classNames={classes.input}
          name="name"
          {...form.getInputProps('name')}
        />
        <NumberInput
          precision={6}
          step={0.000001}
          label="Latitude"
          placeholder="Enter latitude"
          classNames={classes.input}
          name="lat"
          {...form.getInputProps('lat')}
        />
        <NumberInput
          precision={6}
          step={0.000001}
          label="Longitude"
          placeholder="Enter longitude"
          classNames={classes.input}
          name="lon"
          {...form.getInputProps('lon')}
        />

        <Select
          style={{ marginTop: 20, zIndex: 2 }}
          data={['Rice', 'Wheat', 'Tomato']}
          placeholder="Type of crop"
          label="Please select the crop"
          classNames={classes.input}
          {...form.getInputProps('crop')}
        />
        <br />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
