import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import './DisplayManager.scss';

interface DisplayManagerProps {
  className?: string;
  params: string[];
  setParams: (params: string[]) => void;
}

const DisplayManager = ({ params, setParams, className }: DisplayManagerProps) => {

  const handleParams = (
    event: React.MouseEvent<HTMLElement>,
    newParams: string[]
  ) => {
    setParams(newParams);
  };

  return (
    <Box className={`display-manager-container ${className}`}
         sx={{ bgcolor: 'secondary.main', color: 'text.secondary' }}>
      <ToggleButtonGroup value={params}
                         onChange={handleParams}>
        <ToggleButton value='shuffle'><ShuffleRoundedIcon /></ToggleButton>
        <ToggleButton value='favourite'><StarRoundedIcon /></ToggleButton>
      </ToggleButtonGroup>
    </Box>);
};

export default DisplayManager;
