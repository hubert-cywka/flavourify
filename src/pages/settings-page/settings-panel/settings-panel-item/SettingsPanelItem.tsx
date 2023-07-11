import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ComponentProps } from 'react';

interface SettingsPanelItemProps extends ComponentProps<'div'> {
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
