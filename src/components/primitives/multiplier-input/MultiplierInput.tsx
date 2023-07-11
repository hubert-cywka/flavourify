import { Box, Button } from '@mui/material';
import './MultiplierInput.scss';
import classNames from 'classnames';

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

  const buildButton = (text: string, valueChangeArgument: number, label: string) => {
    return (
      <Button
        aria-label={label}
        className="button"
        sx={{ color: 'text.primary' }}
        onClick={() => handleValueChange(valueChangeArgument)}>
        {text}
      </Button>
    );
  };

  return (
    <Box className={classNames('multiplier-input-container', className)}>
      <Box className="value-field">{value}</Box>
      <Box className="buttons-container">
        {buildButton('-', -1, 'Decrement value')}
        {buildButton('+', 1, 'Increment value')}
      </Box>
    </Box>
  );
};

export default MultiplierInput;
