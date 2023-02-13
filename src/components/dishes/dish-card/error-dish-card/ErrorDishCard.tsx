import { Box, Button, Card, Typography } from '@mui/material';
import './ErrorDishCard.scss';

interface ErrorDishCardProps {
  img: string;
  title: string;
  caption: string;
  callback: () => void;
}

const ErrorDishCard = ({ img, title, caption, callback }: ErrorDishCardProps) => {
  return (
    <Card className="error-dish-card-container">
      <Box className="image-container">
        <img src={img} alt={title} className="error-image" />
      </Box>
      <Typography variant="h6" className="error-title">
        {title}
      </Typography>
      <Button
        onClick={callback}
        variant="contained"
        className="error-button"
        sx={{ textTransform: 'none' }}>
        {caption}
      </Button>
    </Card>
  );
};

export default ErrorDishCard;
