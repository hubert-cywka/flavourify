import {
  Box,
  ClickAwayListener,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchRounded, TagRounded } from '@mui/icons-material';
import './DisplayedTag.scss';
import { Tag } from '../../../types/interfaces/Tag';
import { getTags } from '../../../services/TagsService';
import { lastViewedDishContext } from '../../../contexts/LastViewedDishContext';
import Builder from '../../../utility/Builder';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { ALL_TAGS, NO_TAGS_ERROR } from '../../../constants/TagsConstants';
import { DISHES_QUERY, TAGS_WITH_CONTENT_QUERY } from '../../../constants/QueryConstants';

interface DisplayedTagProps {
  className?: string;
}

const DisplayedTag = ({ className }: DisplayedTagProps) => {
  const [isTagSelectDialogOpen, setIsTagSelectDialogOpen] = useState<boolean>(false);
  const { data: tagsList, status } = useQuery<Tag[]>({
    queryFn: () => getTags(true),
    queryKey: [DISHES_QUERY, TAGS_WITH_CONTENT_QUERY]
  });
  const { lastViewedDish, setLastViewedDish } = useContext(lastViewedDishContext);
  const [textFilter, setTextFilter] = useState('');

  const updateDisplayedTag = (tag: Tag) => {
    setLastViewedDish({ tag: tag, slide: 0 });
  };

  const getQueryResult = () => {
    return Builder.createResult(status)
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
          {tagsList &&
            tagsList.map((tag) => {
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
            })}
        </Box>
      )
      .onError(
        <ListItem className="search-list-item">
          <ListItemText className="list-item-text" disableTypography>
            {NO_TAGS_ERROR}
          </ListItemText>
        </ListItem>
      )
      .build();
  };

  return (
    <ClickAwayListener onClickAway={() => setIsTagSelectDialogOpen(false)}>
      <Box className="displayed-tag-container" sx={{ color: 'text.primary' }}>
        <Box
          className={`displayed-tag ${className}`}
          onClick={() => setIsTagSelectDialogOpen((prev) => !prev)}>
          <Box className="displayed-tag-name">
            {tagsList && lastViewedDish.tag.name ? lastViewedDish.tag.name : ALL_TAGS.name}
          </Box>
          <TagRounded className="displayed-tag-icon" sx={{ color: 'secondary.main' }} />
        </Box>

        {isTagSelectDialogOpen && (
          <List className="search-list" sx={{ bgcolor: 'secondary.main' }}>
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
            {getQueryResult()}
          </List>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default DisplayedTag;
