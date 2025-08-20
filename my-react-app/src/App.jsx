
import './App.css';
import { createTheme, MantineProvider, useMantineColorScheme} from '@mantine/core';
// core styles are required for all packages
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';

import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import Store from './Store';
import AppRoute from './Pages/AppRoute';
import { useEffect } from 'react';

// Component to handle dark mode class on HTML element
function DarkModeHandler() {
  const { colorScheme } = useMantineColorScheme();
  
  useEffect(() => {
    if (colorScheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [colorScheme]);
  
  return null;
}

function App() {
  const theme = createTheme({
    focusRing:"never",
    fontFamily:"Poppins, sans-serif",
    primaryColor: 'bright-sun',
    primaryShade: 4,
    colors:{'bright-sun': ['#fffbeb','#fff3c6','#ffe588','#ffd149','#ffbd20','#f99b07','#dd7302','#b75006','#943c0c','#7a330d','#461902'],
      'mine-shaft': ['#f6f6f6',
        '#e7e7e7',
        '#d1d1d1',
        '#b0b0b0',
        '#888888',
        '#6d6d6d',
        '#5d5d5d',
        '#4f4f4f',
        '#454545',
        '#3d3d3d',
        '#2d2d2d',]
    },
    })
  return (
    <Provider store={Store}>
    <MantineProvider theme={theme}>
      <DarkModeHandler />
      <Notifications position="top-center" zIndex={1000} />
      <AppRoute/>
    </MantineProvider>
    </Provider>
  );
}

export default App;
