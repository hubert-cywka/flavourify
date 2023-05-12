import { useRef } from 'react';
import { Box, Input } from '@mui/material';
import imageCompression from 'browser-image-compression';
import { useSnackbar } from 'notistack';
import { IMAGE_EDIT_ERROR } from '../../../../constants/DishesConstants';
import './UserProfilePicture.scss';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import { USER_DETAILS_QUERY } from '../../../../constants/QueryConstants';
import {
  PROFILE_PICTURE_CHANGE_SUCCESS,
  PROFILE_PICTURE_CHANGE_UNEXPECTED_ERROR
} from '../../../../constants/UserConstants';
import { queryClient } from '../../../../services/QueryClient';
import { changeMyProfilePicture } from '../../../../services/UserService';
import { getCompressedImageUrl } from '../../../../utility/getCompressedImageUrl';

interface UserProfilePictureProps {
  src: string;
  fallbackText: string;
  className?: string;
  editable?: boolean;
}

const UserProfilePicture = ({
  src,
  editable,
  className,
  fallbackText
}: UserProfilePictureProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  const validateUploadedImage = (files: FileList) => {
    if (files[0] && (files[0].type.includes('image/png') || files[0].type.includes('image/jpeg'))) {
      return true;
    } else {
      enqueueSnackbar(IMAGE_EDIT_ERROR, { variant: 'warning' });
      return false;
    }
  };

  const updateDisplayedImageSource = async () => {
    if (!imageInputRef?.current) return;

    const input = imageInputRef.current;
    const files = input.files;

    if (files && validateUploadedImage(files)) {
      const compressedPicture = await getCompressedImageUrl(
        await imageCompression.getDataUrlFromFile(files[0]),
        0.3
      );
      changeMyProfilePicture(compressedPicture)
        .then(() => {
          enqueueSnackbar(PROFILE_PICTURE_CHANGE_SUCCESS, { variant: 'success' });
          queryClient.invalidateQueries([USER_DETAILS_QUERY]);
        })
        .catch(() =>
          enqueueSnackbar(PROFILE_PICTURE_CHANGE_UNEXPECTED_ERROR, { variant: 'error' })
        );
    }
  };

  return (
    <label htmlFor="profile-picture" className={`profile-picture-container ${className}`}>
      {editable && (
        <>
          <Input
            className="image-input"
            type="file"
            name="profile-picture"
            id="profile-picture"
            inputProps={{ accept: 'image/png, image/jpeg' }}
            onChange={updateDisplayedImageSource}
            inputRef={imageInputRef}
          />
          <AddPhotoAlternateRoundedIcon className="edit-icon" sx={{ color: 'accent.main' }} />
        </>
      )}
      <Box className="profile-picture-clipper">
        {src ? <img className="profile-picture" src={src} draggable={false} /> : fallbackText}
      </Box>
    </label>
  );
};

export default UserProfilePicture;
