import {
  USERNAME_CHANGE_SUCCESS,
  USERNAME_CHANGE_UNEXPECTED_ERROR
} from 'shared/constants/UserConstants';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, FormHelperText, Input, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import '../ProfileEditFormShared.scss';
import { USER_DETAILS_QUERY } from 'shared/constants/QueryConstants';
import { getNicknameValidationSchema } from 'shared/constants/ValidationSchemas';
import { queryClient } from 'services/QueryClient';
import { changeMyUsername } from 'services/UserService';
import { ComponentProps } from 'react';
import classNames from 'classnames';

type UsernameChangeInputs = {
  username: string;
};

const UsernameChangeForm = ({ className }: ComponentProps<'div'>) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: changeUsername, status } = useMutation([], () =>
    changeMyUsername(getValues('username'))
  );

  const usernameChangeValidationSchema = yup.object({
    username: getNicknameValidationSchema()
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm<UsernameChangeInputs>({
    mode: 'onBlur',
    resolver: yupResolver(usernameChangeValidationSchema)
  });

  const handleUsernameChange = () => {
    changeUsername()
      .then(() => {
        enqueueSnackbar(USERNAME_CHANGE_SUCCESS, { variant: 'success' });
        queryClient.invalidateQueries([USER_DETAILS_QUERY]);
      })
      .catch(() => enqueueSnackbar(USERNAME_CHANGE_UNEXPECTED_ERROR, { variant: 'error' }))
      .finally(() => reset());
  };

  return (
    <form
      className={classNames('profile-edit-form', className)}
      onSubmit={handleSubmit(handleUsernameChange)}>
      <Typography className="form-input-label">New username</Typography>
      <Input
        sx={{ borderColor: errors.username ? 'error.main' : 'rgba(255, 255, 255, 0.5)' }}
        disableUnderline
        className="form-input"
        {...register('username')}
      />
      <FormHelperText className="form-helper-text" error={!!errors.username}>
        {errors?.username?.message ?? ' '}
      </FormHelperText>

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
            Update username
          </Button>
        </Box>
      )}
    </form>
  );
};

export default UsernameChangeForm;
