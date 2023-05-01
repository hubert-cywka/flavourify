import Builder from '../../../../utility/Builder';
import { Box, Button, FormHelperText, Input, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import {
  USERNAME_CHANGE_SUCCESS,
  USERNAME_CHANGE_UNEXPECTED_ERROR
} from '../../../../constants/AuthConstants';
import * as yup from 'yup';
import { getNicknameValidationSchema } from '../../../../constants/ValidationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import '../ChangeFormShared.scss';
import { changeMyUsername } from '../../../../services/UserService';
import { queryClient } from '../../../../services/QueryClient';
import { USER_DETAILS_QUERY } from '../../../../constants/QueryConstants';

type UsernameChangeInputs = {
  username: string;
};

interface UsernameChangeFormProps {
  className?: string;
}

const UsernameChangeForm = ({ className }: UsernameChangeFormProps) => {
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

  const getFormButtons = () => {
    return (
      <Box className="form-buttons-container">
        <Button
          className="form-clear-button form-button"
          type="reset"
          onClick={() => reset()}
          variant="errorOutlined">
          Clear
        </Button>
        <Button className="form-submit-button form-button" type="submit" variant="successContained">
          Update username
        </Button>
      </Box>
    );
  };

  return (
    <form className={`change-form ${className}`} onSubmit={handleSubmit(handleUsernameChange)}>
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

      {Builder.createResult(status)
        .onSuccess(<>{getFormButtons()}</>)
        .onError(<>{getFormButtons()}</>)
        .onIdle(getFormButtons())
        .build()}
    </form>
  );
};

export default UsernameChangeForm;
