import React from 'react';
import {
  RingProgress,
  Text,
  SimpleGrid,
  Paper,
  Center,
  Group,
} from '@mantine/core';
import { ArrowUpRight, ArrowDownRight } from 'tabler-icons-react';
import { useQuery } from 'react-query';
import axios from 'axios';

interface StatsRingProps {
  data: {
    label: string;
    stats: string;
    progress: number;
    color: string;
    icon: 'up' | 'down';
  }[];
}

const icons = {
  up: ArrowUpRight,
  down: ArrowDownRight,
};

export function Stats({
  lat,
  lon,
  crop,
}: {
  lat?: any;
  lon?: any;
  crop?: any | string;
}) {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery('stats-data', () => {
    return axios
      .get(`http://localhost:5000/updates/${lat}/${lon}/${crop}/`)
      .then((res) => res.data);
  });

  if (isLoading) {
    return <> Loading data....</>;
  } else if (!response) {
    return <> Loading Data.... </>;
  }

  // rainProbability,
  // shouldWater,
  // currentSoilMoisture,

  // const data: StatsRingProps = {};
  const data: StatsRingProps['data'] = [
    {
      color: 'green',
      icon: 'up',
      label: 'Rain Probability',
      progress: response?.rainProbability,
      stats: response?.rainProbability,
    },
    {
      color: 'green',
      icon: 'up',
      label: 'Should Water?',
      progress: response?.rainProbability,
      stats: response?.rainProbability,
    },
    {
      color: 'green',
      icon: 'up',
      label: 'Current Soil Moisture',
      progress: response?.currentSoilMoisture,
      stats: response?.currentSoilMoisturey,
    },
  ];
  const stats = data.map((stat: any) => {
    const Icon = icons[stat.icon as 'up'];
    return (
      <Paper withBorder radius="md" p="xs" key={stat.label}>
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <Icon size={22} />
              </Center>
            }
          />

          <div>
            <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
              {stat.label}
            </Text>
            <Text weight={700} size="xl">
              {stat.stats}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });
  return (
    <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      {stats}
    </SimpleGrid>
  );
}
