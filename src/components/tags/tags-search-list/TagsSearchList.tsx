import { Box, Input, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import Builder from 'shared/utility/Builder';
import { ALL_TAGS, NO_TAGS_ERROR } from 'shared/constants/TagsConstants';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { Tag } from 'shared/types/Dish';
import { useContext, useState } from 'react';
import { lastViewedDishContext } from 'shared/contexts/LastViewedDishContext';
import { useTags } from 'shared/hooks/queries/useTags';
import './TagsSearchList.scss';

const TagsSearchList = () => {
  const { lastViewedDish, setLastViewedDish } = useContext(lastViewedDishContext);
  const { data: tagsList, status } = useTags(true);
  const [textFilter, setTextFilter] = useState('');

  const updateDisplayedTag = (tag: Tag) => {
    setLastViewedDish({ tag: tag, slide: 0 });
  };

  const parseListOfTags = () => {
    return tagsList?.map((tag) => {
      if (!textFilter || tag.name.toLowerCase().includes(textFilter.toLowerCase()))
        return (
          <ListItem
            className="search-list-item"
            key={tag.id}
            onClick={() => updateDisplayedTag(tag)}>
            <ListItemText className="list-item-text" disableTypography>
              <Box className="tag-name">{tag.name}</Box>
              <Box className="list-item-info">{tag.type}</Box>
            </ListItemText>
            {tag.id === lastViewedDish.tag.id && (
              <ListItemIcon>
                <DoneRoundedIcon className="list-item-icon" sx={{ color: 'accent.main' }} />
              </ListItemIcon>
            )}
          </ListItem>
        );
    });
  };

  return (
    <List className="tags-search-list" sx={{ bgcolor: 'secondary.main' }}>
      <ListItem className="tags-list-header">
        <SearchRounded className="search-icon" sx={{ color: 'text.primary' }} />
        <Input
          value={textFilter}
          disableUnderline
          onChange={(e) => setTextFilter(e.target.value)}
          placeholder="Search for tags"
          className="search-input"
        />
      </ListItem>

      {Builder.createResult(status)
        .onSuccess(
          <Box className="tag-items-container">
            <ListItem className="search-list-item" onClick={() => updateDisplayedTag(ALL_TAGS)}>
              <ListItemText className="list-item-text" disableTypography>
                {ALL_TAGS.name}
              </ListItemText>
              {ALL_TAGS.id === lastViewedDish.tag.id && (
                <ListItemIcon>
                  <DoneRoundedIcon className="list-item-icon" sx={{ color: 'accent.main' }} />
                </ListItemIcon>
              )}
            </ListItem>
            {parseListOfTags()}
          </Box>
        )
        .onError(
          <ListItem className="search-list-item">
            <ListItemText className="list-item-text" disableTypography>
              {NO_TAGS_ERROR}
            </ListItemText>
          </ListItem>
        )
        .build()}
    </List>
  );
};

export default TagsSearchList;
