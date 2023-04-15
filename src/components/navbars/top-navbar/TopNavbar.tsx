import { Box, Button } from '@mui/material';
import './TopNavbar.scss';
import DisplayedTag from '../../tags/displayed-tag/DisplayedTag';
import SearchBar from './search-bar/SearchBar';
import { ArrowBackRounded } from '@mui/icons-material';
import appRouter from '../../router/AppRouter';

interface TopNavbarProps {
  className?: string;
  singleDishVariant?: boolean;
  searchValue?: string;
}

const TopNavbar = ({ className, singleDishVariant, searchValue }: TopNavbarProps) => {
  return (
    <Box className={`top-navbar-container ${className}`}>
      <SearchBar searchValue={searchValue} className="search-bar" />
      {!singleDishVariant ? (
        <DisplayedTag className="displayed-tag" />
      ) : (
        <Button
          sx={{ bgcolor: 'secondary.main' }}
          className="back-button"
          variant="contained"
          onClick={() => appRouter.navigate(-1)}
          startIcon={<ArrowBackRounded />}>
          Go back
        </Button>
      )}
    </Box>
  );
};

export default TopNavbar;
