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
              main: '#6500d3',
              light: '#c637ff',
              dark: '#6b0097'
            },
            secondary: {
              main: '#050046',
              light: '#1900ff',
              dark: '#030723'
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
              main: '#06093e',
              light: '#3138ff',
              dark: '#070b4c'
            },
            secondary: {
              main: '#03002a',
              light: '#1900ff',
              dark: '#030723'
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
              backgroundColor: '#03003a',
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
          <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>
        </ThemeProvider>
      </lastViewedDishContext.Provider>
    </ColorModeContext.Provider>
  );
};

export default AppProvider;
