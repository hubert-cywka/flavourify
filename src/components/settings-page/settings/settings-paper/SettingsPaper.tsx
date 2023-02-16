import { Paper, IconButton, Typography, Divider } from '@mui/material';
import './SettingsPaper.scss';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface SettingsPaperProps {
  text: string;
  icon: ReactJSXElement;
  callback: () => void;
  className?: string;
}

const SettingsPaper = ({ text, icon, callback, className }: SettingsPaperProps) => {
  return (
    <Paper className={`settings-paper-container ${className}`} sx={{ bgcolor: 'secondary.main' }}>
      <IconButton onClick={callback} color="primary" className="icon">
        {icon}
      </IconButton>
      <Divider className="divider" orientation="vertical" sx={{ borderColor: 'primary.main' }} />
      <Typography className="text"> {text} </Typography>
    </Paper>
  );
};

export default SettingsPaper;
