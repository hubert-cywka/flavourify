import AppRouter from './components/router/AppRouter';
import { RouterProvider } from 'react-router';
import { createTheme, IconButton, PaletteMode, ThemeProvider } from '@mui/material';
import { useLocalStorage } from './utility/hooks/useLocalStorage';
import { ColorModeContext } from './contexts/ColorModeContext';
import {
  setCustomViewportHeightVariable,
  setCustomViewportSizeVariableUpdater,
  setCustomViewportWidthVariable
} from './utility/viewportSizeVariable';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/QueryClient';
import { SnackbarKey, SnackbarProvider, useSnackbar } from 'notistack';
import { lastViewedDishContext, lastViewedDishI } from './contexts/LastViewedDishContext';
import { useState } from 'react';
import { HighlightOffRounded } from '@mui/icons-material';
import { ALL_TAGS } from './constants/TagsConstants';

function App() {
  const [colorMode, setColorMode] = useLocalStorage('COLOR_MODE_STORAGE_KEY', 'light');
  const [lastViewedDish, setLastViewedDish] = useState<lastViewedDishI>({
    tag: ALL_TAGS,
    slide: 0
  });

  const dismissSnackbar = (id: SnackbarKey) => {
    const { closeSnackbar } = useSnackbar();
    return (
      <IconButton sx={{ color: 'text.secondary' }} onClick={() => closeSnackbar(id)}>
        <HighlightOffRounded />
      </IconButton>
    );
  };

  const updateLastViewedDish = (lastViewed: lastViewedDishI) => {
    setLastViewedDish(lastViewed);
  };

  const toggleColorMode = () =>
    setColorMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));

  setCustomViewportWidthVariable();
  setCustomViewportHeightVariable();
  setCustomViewportSizeVariableUpdater();

  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: 'Montserrat'
      }
    },
    palette: {
      mode: colorMode,
      ...(colorMode === 'light'
        ? {
            primary: {
              main: '#ff9e00',
              light: '#ffcc00',
              dark: '#ff6d00'
            },
            secondary: {
              main: '#240046',
              light: '#8700ff',
              dark: '#140323'
            },
            text: {
              primary: '#444444',
              secondary: '#ffffff'
            },
            accent: {
              main: '#c800ff'
            }
          }
        : {
            primary: {
              main: '#6f1fc0',
              light: '#9d4edd',
              dark: '#240046'
            },
            secondary: {
              main: '#280f2c',
              light: '#541d5d',
              dark: '#090309'
            },
            text: {
              primary: '#ffffff',
              secondary: '#ffffff'
            },
            accent: {
              main: '#ff9e00'
            }
          })
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none'
          }
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
      <lastViewedDishContext.Provider
        value={{ setLastViewedDish: updateLastViewedDish, lastViewedDish: lastViewedDish }}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <SnackbarProvider
              action={(key) => dismissSnackbar(key)}
              maxSnack={5}
              preventDuplicate={true}
              variant="warning"
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
              <RouterProvider router={AppRouter} />
            </SnackbarProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </lastViewedDishContext.Provider>
    </ColorModeContext.Provider>
  );
}

export default App;
