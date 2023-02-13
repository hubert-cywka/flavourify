import { Input } from '@mui/material';
import React, { RefObject, useCallback, useState } from 'react';
import { useUpdateEffect } from '../../../utility/hooks/useUpdateEffect';
import PopupAlert from '../../alert/PopupAlert';

interface EditableTextFieldProps {
  isReadOnly?: boolean;
  value: string;
  className?: string;
  reference?: RefObject<any>;
  multiline?: boolean;
  max?: number;
  errorMessage?: string;
  type?: 'text' | 'number';
}

const EditableTextField = ({
  isReadOnly,
  className,
  value,
  reference,
  multiline,
  max,
  errorMessage,
  type
}: EditableTextFieldProps) => {
  const [displayedValue, setDisplayedValue] = useState<string>(value);
  const [currentAlertMessage, setCurrentAlertMessage] = useState('');

  useUpdateEffect(() => {
    setDisplayedValue(value);
  }, [isReadOnly]);

  const handleAlertClose = (event: React.SyntheticEvent<any> | Event, reason: string) => {
    if (reason !== 'clickaway') setCurrentAlertMessage('');
  };

  const allowEdit = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isReadOnly) e.preventDefault();
    },
    [isReadOnly]
  );

  const isValidNumber = (value: string): boolean => {
    return /^-?\d*\.?\d*$/.test(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (max && e.target.value.length > max) {
      setCurrentAlertMessage(
        errorMessage ? errorMessage : `This value can be only ${max} characters long.`
      );
    } else if (type && type === 'number' && !isValidNumber(e.target.value)) {
      setCurrentAlertMessage('This value must be a valid number.');
    } else {
      setDisplayedValue(e.target.value);
      setCurrentAlertMessage('');
    }
  };

  const checkIfEmpty = () => {
    if (!displayedValue.length) {
      setCurrentAlertMessage('This field can not be empty.');
      setDisplayedValue(value);
    }
  };

  return (
    <>
      <Input
        multiline={multiline}
        ref={reference}
        disableUnderline={true}
        sx={{ color: 'text.primary' }}
        className={className}
        value={displayedValue}
        onMouseDown={(e) => allowEdit(e)}
        onBlur={checkIfEmpty}
        onChange={(e) => handleChange(e)}></Input>
      {currentAlertMessage && (
        <PopupAlert
          open={!!currentAlertMessage}
          onClose={handleAlertClose}
          message={currentAlertMessage}
        />
      )}
    </>
  );
};

export default EditableTextField;
