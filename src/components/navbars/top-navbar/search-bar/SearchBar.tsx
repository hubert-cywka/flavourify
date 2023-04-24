import {
  Box,
  ClickAwayListener,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { NavigateNextRounded, SearchRounded } from '@mui/icons-material';
import { useRef, useState } from 'react';
import './SearchBar.scss';
import { useQuery } from '@tanstack/react-query';
import { DISHES_NAMES_QUERY } from '../../../../constants/QueryConstants';
import { getListOfDishesByName } from '../../../../services/DishService';
import Builder from '../../../../utility/Builder';
import appRouter from '../../../router/AppRouter';
import ROUTE from '../../../router/RoutingConstants';
import { motion } from 'framer-motion';

interface SearchBarProps {
  className?: string;
  searchValue?: string;
  onFocus: () => void;
  onBlur: () => void;
}

const SearchBar = ({ className, searchValue, onBlur, onFocus }: SearchBarProps) => {
  const [textFilter, setTextFilter] = useState('');
  const [areSearchResultsDisplayed, setAreSearchResultsDisplayed] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data, status } = useQuery([DISHES_NAMES_QUERY, { name: textFilter }], () =>
    getListOfDishesByName(textFilter)
  );

  const navigateToSearchResultPage = (id: number) => {
    setAreSearchResultsDisplayed(false);
    appRouter.navigate(ROUTE.FOUND_DISH.replace(':id', id.toString()));
  };

  const setFocusOnInput = () => {
    if (!inputRef || !inputRef.current) return;
    inputRef.current.focus();
  };

  const getQueryResults = () => {
    return Builder.createResult(status)
      .onSuccess(
        <>
          {data &&
            data.map((dish) => (
              <ListItem
                key={dish.id}
                className="search-list-item"
                onClick={() => navigateToSearchResultPage(dish.id)}>
                <ListItemText className="list-item-text" disableTypography>
                  {dish.name}
                </ListItemText>
                <ListItemIcon sx={{ color: 'accent.main' }}>
                  <NavigateNextRounded className="list-item-icon" />
                </ListItemIcon>
              </ListItem>
            ))}
        </>
      )
      .onError(
        <ListItem className="search-list-item">
          <ListItemText className="list-item-text" disableTypography>
            Could not find any dishes
          </ListItemText>
        </ListItem>
      )
      .onLoading(
        <ListItem className="search-list-item">
          <ListItemText className="list-item-text" disableTypography>
            Searching...
          </ListItemText>
        </ListItem>
      )
      .build();
  };

  return (
    <ClickAwayListener onClickAway={() => setAreSearchResultsDisplayed(false)}>
      <Box className="dish-names-list-container">
        <Box className={`search-bar-container ${className}`}>
          <motion.div animate={{ marginRight: textFilter.length ? '5px' : '0' }}>
            <SearchRounded
              className="search-icon"
              sx={{ color: 'primary.main' }}
              onClick={setFocusOnInput}
            />
          </motion.div>
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
            {getQueryResults()}
          </List>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;
