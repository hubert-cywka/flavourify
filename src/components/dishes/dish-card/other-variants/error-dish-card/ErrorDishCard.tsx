import { Box, Button, Typography, Skeleton, Divider } from '@mui/material';
import { memo } from 'react';
import './ErrorDishCard.scss';

interface ErrorDishCardProps {
  img?: string;
  title?: string;
  caption?: string;
  callback?: () => void;
  loading?: boolean;
}

const ErrorDishCard = ({ img, title, caption, callback, loading }: ErrorDishCardProps) => {
  return (
    <Box className="error-dish-card-container">
      {loading ? (
        <>
          <Box className="image-container">
            <Skeleton variant="rectangular" className="loading-image" />
          </Box>
          <Skeleton variant="rectangular" className="loading-element" />
          <Skeleton variant="rectangular" className="loading-button" />
        </>
      ) : (
        <>
          <Box className="image-container">
            <img src={img} alt={title} className="error-image" />
          </Box>
          <Divider className="field-label">Ooops!</Divider>
          <Typography variant="h6" className="error-title">
            {title}
          </Typography>
          <Button onClick={callback} variant="secondaryContained" className="error-button">
            {caption}
          </Button>
        </>
      )}
    </Box>
  );
};

export default memo(ErrorDishCard);
