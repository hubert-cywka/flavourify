import { Input, SxProps } from '@mui/material';
import React, { RefObject, useCallback, useState } from 'react';
import { useUpdateEffect } from '../../../utility/hooks/useUpdateEffect';
import { useSnackbar } from 'notistack';
import { FIELD_CANNOT_BE_EMPTY, VALUE_MUST_BE_NUMBER } from '../../../constants/AppConstants';

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
  preventScroll
}: EditableTextFieldProps) => {
  const [displayedValue, setDisplayedValue] = useState<string>(value);
  const { enqueueSnackbar } = useSnackbar();

  useUpdateEffect(() => {
    setDisplayedValue(value);
  }, [isReadOnly]);

  const allowEdit = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isReadOnly) e.preventDefault();
    },
    [isReadOnly]
  );

  const isValidNumber = useCallback((value: string): boolean => {
    return /^-?\d*\.?\d*$/.test(value);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (max && e.target.value.length > max) {
        enqueueSnackbar(
          errorMessage ? errorMessage : `This value can be only ${max} characters long.`
        );
      } else if (type && type === 'number' && !isValidNumber(e.target.value)) {
        enqueueSnackbar(VALUE_MUST_BE_NUMBER);
      } else {
        setDisplayedValue(e.target.value);
      }
    },
    []
  );

  const checkIfEmpty = useCallback(() => {
    if (!displayedValue.length) {
      enqueueSnackbar(FIELD_CANNOT_BE_EMPTY);
      setDisplayedValue(value);
    }
  }, [displayedValue]);

  const scrollIntoView = useCallback(() => {
    if (reference?.current && preventScroll === false)
      reference.current.scrollIntoView({ behavior: 'smooth' });
  }, [reference, preventScroll]);

  return (
    <Input
      autoFocus={autoFocus}
      ref={reference}
      multiline={multiline}
      className={className}
      disableUnderline={true}
      sx={{ color: 'text.secondary', ...sx }}
      value={displayedValue}
      onBlur={checkIfEmpty}
      onFocus={scrollIntoView}
      onChange={(e) => handleChange(e)}
      onMouseDown={(e) => allowEdit(e)}></Input>
  );
};

export default EditableTextField;
