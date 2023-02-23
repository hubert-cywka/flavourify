import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface SettingsPanelItemProps {
  className?: string;
  icon: ReactJSXElement;
  text: string;
  callback?: () => void;
  inPlace?: boolean;
}

const SettingsPanelItem = ({
  className,
  text,
  icon,
  callback,
  inPlace
}: SettingsPanelItemProps) => {
  return (
    <ListItem className={className} onClick={callback}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText disableTypography>{text}</ListItemText>
      {!inPlace && (
        <ListItemIcon>
          <NavigateNextRoundedIcon sx={{ color: 'accent.main' }} />
        </ListItemIcon>
      )}
    </ListItem>
  );
};

export default SettingsPanelItem;
