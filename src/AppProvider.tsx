import { useState } from 'react';
import {
  createTheme,
  darken,
  lighten,
  PaletteMode,
  ThemeProvider,
  useMediaQuery
} from '@mui/material';
import { useLocalStorage } from './utility/hooks/useLocalStorage';
import { ColorModeContext } from './contexts/ColorModeContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/QueryClient';
import { lastViewedDishContext, lastViewedDishI } from './contexts/LastViewedDishContext';
import { ALL_TAGS } from './constants/TagsConstants';
import { AlertProvider } from './AlertProvider';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface AppProviderProps {
  children: ReactJSXElement | ReactJSXElement[];
}
const AppProvider = ({ children }: AppProviderProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [colorMode, setColorMode] = useLocalStorage(
    'COLOR_MODE_STORAGE_KEY',
    prefersDarkMode ? 'dark' : 'light'
  );
  const [lastViewedDish, setLastViewedDish] = useState<lastViewedDishI>({
    tag: ALL_TAGS,
    slide: 0
  });

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
              main: '#5a00bc',
              light: '#c637ff',
              dark: '#420087'
            },
            secondary: {
              main: '#0F0425',
              light: '#1E0849',
              dark: '#42176b'
            },
            text: {
              primary: '#ffffff',
              secondary: '#444444'
            },
            accent: {
              main: '#ff9e00',
              success: '#5ee3a3',
              error: '#e54f4f'
            }
          }
        : {
            primary: {
              main: '#100037',
              light: '#2D0C6E',
              dark: '#0F0425'
            },
            secondary: {
              main: '#0F0425',
              light: '#1E0849',
              dark: '#281356'
            },
            text: {
              primary: '#ffffff',
              secondary: '#ffffff'
            },
            accent: {
              main: '#ff9e00',
              success: '#5ee3a3',
              error: '#e54f4f'
            }
          })
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true
        }
      },
      MuiCircularProgress: {
        styleOverrides: {
          root: {
            color: '#ff9e00'
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none'
          }
        },
        variants: [
          {
            props: { variant: 'errorContained' },
            style: {
              color: '#222222',
              backgroundColor: '#e54f4f',
              ':hover': { backgroundColor: darken('#e54f4f', 0.15) }
            }
          },
          {
            props: { variant: 'successContained' },
            style: {
              color: '#222222',
              backgroundColor: '#5ee3a3',
              ':hover': { backgroundColor: darken('#5ee3a3', 0.15) }
            }
          },
          {
            props: { variant: 'accentContained' },
            style: {
              color: '#222222',
              backgroundColor: '#ff9e00',
              ':hover': { backgroundColor: darken('#ff9e00', 0.15) }
            }
          },
          {
            props: { variant: 'secondaryContained' },
            style: {
              color: '#ffffff',
              backgroundColor: '#100037',
              ':hover': { backgroundColor: lighten('#03003a', 0.1) }
            }
          }
        ]
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

  const updateLastViewedDish = (lastViewed: lastViewedDishI) => {
    setLastViewedDish(lastViewed);
  };

  const toggleColorMode = () =>
    setColorMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, colorMode: colorMode }}>
      <lastViewedDishContext.Provider
        value={{ setLastViewedDish: updateLastViewedDish, lastViewedDish: lastViewedDish }}>
        <ThemeProvider theme={theme}>
          <AlertProvider>
            <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>
          </AlertProvider>
        </ThemeProvider>
      </lastViewedDishContext.Provider>
    </ColorModeContext.Provider>
  );
};

export default AppProvider;
