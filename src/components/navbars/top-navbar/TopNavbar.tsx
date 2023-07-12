import { Box, ClickAwayListener, Fade } from '@mui/material';
import './TopNavbar.scss';
import { useSpring } from '@react-spring/web';
import { animated } from 'react-spring';
import SearchBar from './search-bar/SearchBar';
import { ArrowBackRounded, TagRounded } from '@mui/icons-material';
import { ComponentProps, useContext, useState } from 'react';
import { hasAdminPermission } from 'services/AuthService';
import DishCardAddDialog from 'components/dishes/dish-card/other-variants/dish-card-add/DishCardAddDialog';
import appRouter from 'router/AppRouter';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import classNames from 'classnames';
import { ALL_TAGS } from '../../../shared/constants/TagsConstants';
import { lastViewedDishContext } from '../../../shared/contexts/LastViewedDishContext';
import { useTags } from '../../../shared/hooks/queries/useTags';
import TagsSearchList from '../../tags/tags-search-list/TagsSearchList';

interface TopNavbarProps extends ComponentProps<'div'> {
  singleDishVariant?: boolean;
  searchValue?: string;
}

const TopNavbar = ({ className, singleDishVariant, searchValue }: TopNavbarProps) => {
  const [isFocusOnSearchBar, setIsFocusOnSearchBar] = useState(false);
  const [isDishAddDialogVisible, setIsDishAddDialogVisible] = useState(false);
  const [isTagSelectDialogOpen, setIsTagSelectDialogOpen] = useState<boolean>(false);
  const { lastViewedDish } = useContext(lastViewedDishContext);
  const { data: tagsList } = useTags(true);

  const transition = useSpring({
    width: isFocusOnSearchBar ? '0%' : '50%'
  });

  const closeTagSelectDialog = () => {
    setIsTagSelectDialogOpen(false);
  };

  const toggleTagSelectDialog = () => {
    setIsTagSelectDialogOpen((prev) => !prev);
  };

  return (
    <ClickAwayListener onClickAway={closeTagSelectDialog}>
      <Box component="nav" className={classNames('top-navbar-container', className)}>
        {isTagSelectDialogOpen && <TagsSearchList className="tags-search-list" />}

        <SearchBar
          searchValue={searchValue}
          className={classNames('search-bar', { active: isFocusOnSearchBar })}
          onBlur={() => setIsFocusOnSearchBar(false)}
          onFocus={() => setIsFocusOnSearchBar(true)}
        />

        <animated.div className="top-navbar-buttons" style={transition}>
          {!singleDishVariant ? (
            <>
              <Box className="displayed-tag" onClick={toggleTagSelectDialog}>
                <Box className="displayed-tag-name">
                  {tagsList && lastViewedDish.tag.name ? lastViewedDish.tag.name : ALL_TAGS.name}
                </Box>
                <TagRounded className="displayed-tag-icon" sx={{ color: 'secondary.main' }} />
              </Box>
              {hasAdminPermission() && (
                <AddRoundedIcon
                  sx={{ color: 'secondary.main' }}
                  className="add-dish-button"
                  onClick={() => setIsDishAddDialogVisible(true)}
                />
              )}
            </>
          ) : (
            <ArrowBackRounded
              className="back-button"
              sx={{ color: 'secondary.main' }}
              onClick={() => appRouter.navigate(-1)}
            />
          )}
        </animated.div>

        <Fade in={isDishAddDialogVisible} unmountOnExit={true} mountOnEnter={true}>
          <Box>
            <DishCardAddDialog
              open={isDishAddDialogVisible}
              onClose={() => setIsDishAddDialogVisible(false)}
            />
          </Box>
        </Fade>
      </Box>
    </ClickAwayListener>
  );
};

export default TopNavbar;
