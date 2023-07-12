import { Box, CardMedia, IconButton, Input, Typography } from '@mui/material';
import { memo, RefObject, useRef, useState } from "react";
import { useUpdateEffect } from 'shared/hooks/useUpdateEffect';
import './DishImage.scss';
import FilterRoundedIcon from '@mui/icons-material/FilterRounded';
import imageCompression from 'browser-image-compression';
import { useSnackbar } from 'notistack';
import { IMAGE_EDIT_ERROR, IMAGE_EDIT_INFO } from 'shared/constants/DishesConstants';

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
  const { enqueueSnackbar } = useSnackbar();

  useUpdateEffect(() => {
    setDisplayedImageSrc(src);
  }, [src, editable]);

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
      imageCompression.getDataUrlFromFile(files[0]).then((res) => setDisplayedImageSrc(res));
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
        loading="eager"
        alt={altText}
        ref={reference}
        image={displayedImageSrc}
        draggable={false}
      />
    </label>
  );
};

export default memo(DishImage);
