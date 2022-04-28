import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  Container,
  MantineProvider,
  Stack,
} from '@mantine/core';
import { useLocalStorageValue, useMediaQuery } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { HomeForm } from './components/HomeForm';
import { useState } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from './api/queryClient';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

import { Footer } from './components/Footer';

import Header from './components/Header';
import { GlobalStoreContext } from './contexts/gloablStore';
const THEME_KEY = 'filemanager-color-scheme';

function App() {
  const prefersDarkScheme = useMediaQuery(`(prefers-color-scheme: dark)`);

  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: THEME_KEY,
    defaultValue: prefersDarkScheme ? 'dark' : 'light',
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const [currentPath, setCurrentPath] = useState<string>('');

  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  return (
    <GlobalStoreContext.Provider value={{ currentPath, setCurrentPath }}>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ colorScheme }}
          >
            <AppShell header={<Header />} footer={<Footer />}>
              <Container>
                {/* <Wrapper
                  apiKey={process.env?.G_MAPS_API as string}
                  render={render}
                > */}
                <HomeForm />
                {/* </Wrapper> */}
              </Container>
            </AppShell>
            <ReactQueryDevtools initialIsOpen={false} />
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </GlobalStoreContext.Provider>
  );
}

export default App;
