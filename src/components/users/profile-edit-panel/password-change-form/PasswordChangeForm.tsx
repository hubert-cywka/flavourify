import {
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_UNEXPECTED_ERROR,
  PASSWORD_CHANGE_WRONG_CREDENTIALS_ERROR
} from 'shared/constants/UserConstants';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, FormHelperText, Input, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';
import { useSnackbar } from 'notistack';
import { FieldError, useForm } from 'react-hook-form';
import * as yup from 'yup';
import '../ProfileEditFormShared.scss';
import { USER_DETAILS_QUERY } from 'shared/constants/QueryConstants';
import {
  getConfirmPasswordValidationSchema,
  getNewPasswordValidationSchema,
  getCurrentPasswordValidationSchema
} from 'shared/constants/ValidationSchemas';
import { queryClient } from 'services/QueryClient';
import { changeMyPassword } from 'services/UserService';
import { ComponentProps } from 'react';
import classNames from 'classnames';

type PasswordChangeInputs = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const PasswordChangeForm = ({ className }: ComponentProps<'div'>) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: changePassword, status } = useMutation([], () =>
    changeMyPassword(getValues('currentPassword'), getValues('newPassword'))
  );

  const passwordChangeValidationSchema = yup.object({
    currentPassword: getCurrentPasswordValidationSchema(),
    newPassword: getNewPasswordValidationSchema(),
    confirmPassword: getConfirmPasswordValidationSchema('newPassword')
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm<PasswordChangeInputs>({
    mode: 'onBlur',
    resolver: yupResolver(passwordChangeValidationSchema)
  });

  const buildErrorMessage = (error: AxiosError) => {
    const status = error?.response?.status;

    switch (status) {
      case HttpStatusCode.Conflict:
        return PASSWORD_CHANGE_WRONG_CREDENTIALS_ERROR;

      default:
        return PASSWORD_CHANGE_UNEXPECTED_ERROR;
    }
  };

  const handlePasswordChange = () => {
    changePassword()
      .then(() => {
        enqueueSnackbar(PASSWORD_CHANGE_SUCCESS, { variant: 'success' });
        queryClient.invalidateQueries([USER_DETAILS_QUERY]);
      })
      .catch((error: AxiosError) => enqueueSnackbar(buildErrorMessage(error), { variant: 'error' }))
      .finally(() => reset());
  };

  const buildHelperText = (error: FieldError | undefined) => {
    return (
      <FormHelperText className="form-helper-text" error={!!error}>
        {error?.message ?? ' '}
      </FormHelperText>
    );
  };

  return (
    <form
      className={classNames('profile-edit-form', className)}
      onSubmit={handleSubmit(handlePasswordChange)}>
      <Typography className="form-input-label">Current password</Typography>
      <Input
        sx={{ borderColor: errors.currentPassword ? 'error.main' : 'rgba(255, 255, 255, 0.5)' }}
        disableUnderline
        type="password"
        className="form-input"
        {...register('currentPassword')}
      />
      {buildHelperText(errors.currentPassword)}

      <Typography className="form-input-label">New password</Typography>
      <Input
        sx={{ borderColor: errors.newPassword ? 'error.main' : 'rgba(255, 255, 255, 0.5)' }}
        disableUnderline
        type="password"
        className="form-input"
        {...register('newPassword')}
      />
      {buildHelperText(errors.newPassword)}

      <Typography className="form-input-label">Confirm new password</Typography>
      <Input
        sx={{ borderColor: errors.confirmPassword ? 'error.main' : 'rgba(255, 255, 255, 0.5)' }}
        disableUnderline
        type="password"
        className="form-input"
        {...register('confirmPassword')}
      />
      {buildHelperText(errors.confirmPassword)}

      {status === 'loading' ? (
        <CircularProgress sx={{ color: 'accent.main' }} />
      ) : (
        <Box className="form-buttons-container">
          <Button
            className="form-clear-button form-button"
            type="reset"
            onClick={() => reset()}
            variant="errorOutlined">
            Clear
          </Button>
          <Button
            className="form-submit-button form-button"
            type="submit"
            variant="successContained">
            Update password
          </Button>
        </Box>
      )}
    </form>
  );
};

export default PasswordChangeForm;
