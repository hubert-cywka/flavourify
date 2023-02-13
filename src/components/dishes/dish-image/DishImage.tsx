import { Box, CardMedia, IconButton, Input, Typography } from '@mui/material';
import React, { RefObject, useRef, useState } from 'react';
import { useUpdateEffect } from '../../../utility/hooks/useUpdateEffect';
import PopupAlert from '../../alert/PopupAlert';
import './DishImage.scss';
import FilterRoundedIcon from '@mui/icons-material/FilterRounded';
import imageCompression from 'browser-image-compression';
import { IMAGE_EDIT_ERROR, IMAGE_EDIT_INFO } from '../../../constants/Constants';

interface DishImageProps {
  src: string;
  altText?: string;
  className?: string;
  editable?: boolean;
  reference?: RefObject<any>;
}

const DishImage = ({ src, altText, className, editable, reference }: DishImageProps) => {
  const [displayedImageSrc, setDisplayedImageSrc] = useState<string>(src);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useUpdateEffect(() => {
    setDisplayedImageSrc(src);
  }, [src, editable]);

  const handleAlertClose = (event: React.SyntheticEvent<any> | Event, reason: string) => {
    if (reason !== 'clickaway') setIsAlertVisible(false);
  };

  const validateUploadedImage = (files: FileList) => {
    if (files[0] && (files[0].type.includes('image/png') || files[0].type.includes('image/jpeg'))) {
      setIsAlertVisible(false);
      return true;
    } else {
      setIsAlertVisible(true);
      return false;
    }
  };

  const updateDisplayedImageSource = async () => {
    if (!imageInputRef?.current) return;

    const input = imageInputRef.current;
    const files = input.files;

    if (files && validateUploadedImage(files)) {
      setDisplayedImageSrc(await imageCompression.getDataUrlFromFile(files[0]));
    }
  };

  return (
    <label htmlFor="image" className="dish-image-label-container">
      {editable && (
        <>
          <Input
            className="image-input"
            type="file"
            name="image"
            id="image"
            inputProps={{ accept: 'image/png, image/jpeg' }}
            onChange={updateDisplayedImageSource}
            sx={{ opacity: '0' }}
            inputRef={imageInputRef}
          />
          <Box className="edit-icon-container">
            <IconButton onClick={imageInputRef?.current?.click}>
              <FilterRoundedIcon className="edit-icon" />
            </IconButton>
            <Typography className="edit-info">{IMAGE_EDIT_INFO}</Typography>
          </Box>
        </>
      )}
      <CardMedia
        className={`${className} ${editable && 'editable-image'}`}
        component="img"
        loading="lazy"
        alt={altText}
        ref={reference}
        image={displayedImageSrc}></CardMedia>
      {isAlertVisible && (
        <PopupAlert open={isAlertVisible} onClose={handleAlertClose} message={IMAGE_EDIT_ERROR} />
      )}
    </label>
  );
};

export default DishImage;
