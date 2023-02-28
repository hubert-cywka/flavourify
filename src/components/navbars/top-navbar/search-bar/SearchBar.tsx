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
import { useState } from 'react';
import './SearchBar.scss';
import { useQuery } from '@tanstack/react-query';
import { DISHES_NAMES_QUERY } from '../../../../constants/QueryConstants';
import { getListOfDishesByName } from '../../../../services/DishService';
import Builder from '../../../../utility/Builder';
import appRouter from '../../../router/AppRouter';
import ROUTE from '../../../router/RoutingConstants';

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  const [textFilter, setTextFilter] = useState('');
  const [areSearchResultsDisplayed, setAreSearchResultsDisplayed] = useState<boolean>(false);

  const { data, status } = useQuery([DISHES_NAMES_QUERY, { name: textFilter }], () =>
    getListOfDishesByName(textFilter)
  );

  const navigateToSearchResultPage = (id: number) => {
    setAreSearchResultsDisplayed(false);
    appRouter.navigate(ROUTE.FOUND_DISH.replace(':id', id.toString()));
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
          <SearchRounded className="search-icon" />
          <Input
            value={textFilter}
            disableUnderline
            onChange={(e) => setTextFilter(e.target.value)}
            onFocus={() => setAreSearchResultsDisplayed(true)}
            placeholder="Search for recipes"
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
