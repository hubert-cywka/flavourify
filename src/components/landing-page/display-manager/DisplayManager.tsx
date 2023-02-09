import { Box, IconButton } from '@mui/material';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import './DisplayManager.scss';

interface DisplayManagerProps {
  className?: string;
}

const DisplayManager = ({ className }: DisplayManagerProps) => {
  return (
    <Box className={`display-manager-container ${className}`} sx={{ bgcolor: 'secondary.main', color: 'primary.main' }}>
      <IconButton><ShuffleRoundedIcon /></IconButton>
      <IconButton><StarRoundedIcon /></IconButton>
    </Box>);
};

export default DisplayManager;
