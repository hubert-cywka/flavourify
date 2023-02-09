import { useContext } from 'react';
import { ColorModeContext } from '../../../../contexts/ColorModeContext';
import Brightness5RoundedIcon from '@mui/icons-material/Brightness5Rounded';
import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded';
import SettingsPaper from '../settings-paper/SettingsPaper';

interface ColorModeSettingsProps {
  className?: string;
}

const ColorModeSettings = ({ className }: ColorModeSettingsProps) => {
  const { colorMode, toggleColorMode } = useContext(ColorModeContext);
  const colorModeIcon = colorMode === 'dark' ? <Brightness5RoundedIcon /> : <Brightness4RoundedIcon />;

  return <SettingsPaper
    className={className}
    text={'Toggle color mode'}
    icon={colorModeIcon}
    callback={toggleColorMode} />;
};

export default ColorModeSettings;
