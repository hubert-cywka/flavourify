import { useEffect } from 'react';

export const useResizeOnUpdate = () => {
  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  });
};
