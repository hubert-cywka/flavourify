import { Box, Button } from '@mui/material';
import './MultiplierInput.scss';
import { useCallback } from 'react';

interface MultiplierInputProps {
  value: number;
  min?: number;
  max?: number;
  className?: string;
  callback: (value: number) => void; // eslint-disable-line no-unused-vars
}

const MultiplierInput = ({ value, callback, min, max, className }: MultiplierInputProps) => {
  const handleValueChange = useCallback(
    (arg: number) => {
      if ((min && min > value + arg) || (max && max < value + arg)) return;
      callback(value + arg);
    },
    [value, callback]
  );

  return (
    <Box className={`multiplier-input-container ${className}`}>
      <Box className="value-field">{value}</Box>
      <Box className="buttons-container">
        <Button
          className="decrement-button"
          sx={{ color: 'text.primary' }}
          onClick={() => handleValueChange(-1)}>
          -
        </Button>
        <Button
          className="increment-button"
          sx={{ color: 'text.primary' }}
          onClick={() => handleValueChange(1)}>
          +
        </Button>
      </Box>
    </Box>
  );
};

export default MultiplierInput;
