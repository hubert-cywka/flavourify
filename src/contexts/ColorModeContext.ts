import { createContext } from 'react';

export const ColorModeContext = createContext(
  {} as { toggleColorMode: () => void; colorMode: 'light' | 'dark' }
);
