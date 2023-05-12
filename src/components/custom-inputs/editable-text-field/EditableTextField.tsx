import React, { RefObject, useState } from 'react';
import { Input, SxProps } from '@mui/material';
import { useSnackbar } from 'notistack';
import { FIELD_CANNOT_BE_EMPTY, VALUE_MUST_BE_NUMBER } from '../../../constants/AppConstants';
import { useUpdateEffect } from '../../../utility/hooks/useUpdateEffect';

interface EditableTextFieldProps {
  isReadOnly?: boolean;
  value: string;
  className?: string;
  reference?: RefObject<any>;
  multiline?: boolean;
  max?: number;
  errorMessage?: string;
  type?: 'text' | 'number';
  sx?: SxProps;
  autoFocus?: boolean;
  preventScroll?: boolean;
  placeholder?: string;
}

const EditableTextField = ({
  isReadOnly,
  className,
  value,
  reference,
  multiline,
  max,
  errorMessage,
  type,
  sx,
  autoFocus,
  preventScroll,
  placeholder
}: EditableTextFieldProps) => {
  const [displayedValue, setDisplayedValue] = useState<string>(value);
  const { enqueueSnackbar } = useSnackbar();

  useUpdateEffect(() => {
    setDisplayedValue(value);
  }, [isReadOnly]);

  const allowEdit = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReadOnly) e.preventDefault();
  };

  const isValidNumber = (value: string): boolean => {
    return /^-?\d*\.?\d*$/.test(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (max && e.target.value.length > max) {
      enqueueSnackbar(
        errorMessage ? errorMessage : `This value can be only ${max} characters long.`
      );
    } else if (type === 'number' && !isValidNumber(e.target.value)) {
      enqueueSnackbar(VALUE_MUST_BE_NUMBER);
    } else {
      setDisplayedValue(e.target.value);
    }
  };

  const checkIfEmpty = () => {
    if (!displayedValue.length) {
      enqueueSnackbar(FIELD_CANNOT_BE_EMPTY);
      setDisplayedValue(value);
    }
  };

  const scrollIntoView = () => {
    if (reference?.current && preventScroll === false)
      reference.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Input
      ref={reference}
      className={className}
      sx={{ color: 'text.secondary', ...sx }}
      autoFocus={autoFocus}
      multiline={multiline}
      disableUnderline={true}
      value={displayedValue}
      placeholder={placeholder}
      onBlur={checkIfEmpty}
      onFocus={scrollIntoView}
      onChange={(e) => handleChange(e)}
      onMouseDown={(e) => allowEdit(e)}
    />
  );
};

export default EditableTextField;
