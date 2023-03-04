import { Input, SxProps } from '@mui/material';
import React, { RefObject, useCallback, useState } from 'react';
import { useUpdateEffect } from '../../../utility/hooks/useUpdateEffect';
import { useSnackbar } from 'notistack';

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
  sx
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
        enqueueSnackbar('This value must be a valid number.');
      } else {
        setDisplayedValue(e.target.value);
      }
    },
    []
  );

  const checkIfEmpty = useCallback(() => {
    if (!displayedValue.length) {
      enqueueSnackbar('This field can not be empty.');
      setDisplayedValue(value);
    }
  }, [displayedValue]);

  return (
    <>
      <Input
        ref={reference}
        multiline={multiline}
        className={className}
        disableUnderline={true}
        sx={{ color: 'text.secondary', ...sx }}
        value={displayedValue}
        onBlur={checkIfEmpty}
        onChange={(e) => handleChange(e)}
        onMouseDown={(e) => allowEdit(e)}></Input>
    </>
  );
};

export default EditableTextField;
