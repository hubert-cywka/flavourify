import { Box, Button } from '@mui/material';
import './MultiplierInput.scss';

interface MultiplierInputProps {
  value: number;
  min?: number;
  max?: number;
  className?: string;
  onChange: (value: number) => void; // eslint-disable-line no-unused-vars
}

const MultiplierInput = ({ value, onChange, min, max, className }: MultiplierInputProps) => {
  const handleValueChange = (arg: number) => {
    if ((min && min > value + arg) || (max && max < value + arg)) return;
    onChange(value + arg);
  };

  return (
    <Box className={`multiplier-input-container ${className ?? ''}`}>
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
