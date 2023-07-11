import { ComponentProps, useRef, useState } from 'react';
import { NavigateNextRounded, SearchRounded } from '@mui/icons-material';
import {
  Box,
  ClickAwayListener,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import './SearchBar.scss';
import Builder from 'shared/utility/Builder';
import { useDishNames } from 'shared/hooks/queries/useDishNames';
import appRouter from 'router/AppRouter';
import ROUTE from 'router/RoutingConstants';
import classNames from 'classnames';

interface SearchBarProps extends ComponentProps<'div'> {
  searchValue?: string;
  onFocus: () => void;
  onBlur: () => void;
}

const SearchBar = ({ className, searchValue, onBlur, onFocus }: SearchBarProps) => {
  const [areSearchResultsDisplayed, setAreSearchResultsDisplayed] = useState(false);
  const [textFilter, setTextFilter] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data, status } = useDishNames(textFilter);

  const navigateToSearchResultPage = (id: number | undefined) => {
    if (id === undefined) return;
    setAreSearchResultsDisplayed(false);
    appRouter.navigate(ROUTE.FOUND_DISH.replace(':id', id.toString()));
  };

  const setFocusOnInput = () => {
    if (!inputRef || !inputRef.current) return;
    inputRef.current.focus();
  };

  const buildSearchListItem = (text: string, dishId?: number) => {
    return (
      <ListItem
        key={dishId}
        onClick={() => navigateToSearchResultPage(dishId)}
        className="search-list-item">
        <ListItemText className="list-item-text" disableTypography>
          {text}
        </ListItemText>
        {dishId !== undefined && (
          <ListItemIcon sx={{ color: 'accent.main' }}>
            <NavigateNextRounded className="list-item-icon" />
          </ListItemIcon>
        )}
      </ListItem>
    );
  };

  return (
    <ClickAwayListener onClickAway={() => setAreSearchResultsDisplayed(false)}>
      <Box className="search-bar-wrapper">
        <Box className={classNames('search-bar-container', className)}>
          <SearchRounded
            className="search-icon"
            sx={{ color: 'primary.main' }}
            onClick={setFocusOnInput}
          />
          <Input
            inputRef={inputRef}
            onBlur={onBlur}
            onFocusCapture={onFocus}
            value={textFilter}
            disableUnderline
            onChange={(e) => setTextFilter(e.target.value)}
            onFocus={() => setAreSearchResultsDisplayed(true)}
            placeholder={searchValue ? searchValue : 'Search for recipes'}
            className="search-input"
          />
        </Box>
        {areSearchResultsDisplayed && textFilter.length > 0 && (
          <List sx={{ bgcolor: 'secondary.main' }} className="search-list">
            {Builder.createResult(status)
              .onSuccess(<>{data && data.map((dish) => buildSearchListItem(dish.name, dish.id))}</>)
              .onError(buildSearchListItem('Could not find any dishes'))
              .onLoading(buildSearchListItem('Searching...'))
              .build()}
          </List>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;
