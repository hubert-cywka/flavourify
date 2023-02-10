import { Box, Button } from '@mui/material';
import './MultiplierInput.scss';

interface MultiplierInputProps {
  value: number;
  // eslint-disable-next-line no-unused-vars
  callback: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const MultiplierInput = ({ value, callback, min, max, className }: MultiplierInputProps) => {
  const handleValueChange = (arg: number) => {
    if ((min && min > value + arg) || (max && max < value + arg)) return;
    callback(value + arg);
  };

  return (
    <Box className={`multiplier-input-container ${className}`}>
      <Box className="value-field">{value}</Box>
      <Box className="buttons-container">
        <Button className="increment-button" onClick={() => handleValueChange(1)}>
          +
        </Button>
        <Button className="decrement-button" onClick={() => handleValueChange(-1)}>
          -
        </Button>
      </Box>
    </Box>
  );
};

export default MultiplierInput;
