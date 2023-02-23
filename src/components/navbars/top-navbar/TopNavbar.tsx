import { Box } from '@mui/material';
import './TopNavbar.scss';
import DisplayedTag from '../../tags/displayed-tag/DisplayedTag';
import SearchBar from './search-bar/SearchBar';
import { ArrowBackRounded } from '@mui/icons-material';
import appRouter from '../../router/AppRouter';

interface DisplayManagerProps {
  className?: string;
  singleDishVariant?: boolean;
}

const TopNavbar = ({ className, singleDishVariant }: DisplayManagerProps) => {
  return (
    <Box
      className={`top-navbar-container ${className}`}
      sx={{ bgcolor: 'secondary.main', color: 'text.secondary' }}>
      <SearchBar className="search-bar" />
      {!singleDishVariant ? (
        <DisplayedTag className="selected-tag" />
      ) : (
        <Box className="back-button" onClick={() => appRouter.navigate(-1)}>
          <ArrowBackRounded className="back-button-icon" />
          <Box className="back-button-label">Go back</Box>
        </Box>
      )}
    </Box>
  );
};

export default TopNavbar;
