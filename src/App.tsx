import AppRouter from './components/router/AppRouter';
import { RouterProvider } from 'react-router';
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { useLocalStorage } from './utility/hooks/useLocalStorage';
import { ColorModeContext } from './contexts/ColorModeContext';
import {
  setCustomViewportHeightVariable,
  setCustomViewportSizeVariableUpdater,
  setCustomViewportWidthVariable
} from './utility/viewportSizeVariable';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/QueryClient';

function App() {
  const [colorMode, setColorMode] = useLocalStorage('COLOR_MODE_STORAGE_KEY', 'light');

  const toggleColorMode = () =>
    setColorMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));

  setCustomViewportWidthVariable();
  setCustomViewportHeightVariable();
  setCustomViewportSizeVariableUpdater();

  const theme = createTheme({
    palette: {
      mode: colorMode,
      ...(colorMode === 'light'
        ? {
            primary: {
              main: '#FB2576',
              light: '#FB2576',
              dark: '#332FD0'
            },
            secondary: {
              main: '#250043',
              light: '#390066',
              dark: '#130021'
            },
            text: {
              primary: '#222222',
              secondary: '#ffffff'
            }
          }
        : {
            primary: {
              main: '#6225fb',
              light: '#4c25fb',
              dark: '#2c29b9'
            },
            secondary: {
              main: '#250043',
              light: '#390066',
              dark: '#130021'
            },
            text: {
              primary: '#ffffff',
              secondary: '#ffffff'
            }
          })
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '10px'
          }
        }
      }
    }
  });

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, colorMode: colorMode }}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={AppRouter} />
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
