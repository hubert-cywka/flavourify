import {
  Box,
  Button,
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
import { Tag } from '../../../interfaces/Tag';
import { getTags } from '../../../services/TagsService';
import { lastViewedDishContext } from '../../../contexts/LastViewedDishContext';
import Builder from '../../../utility/Builder';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { ALL_TAGS, NO_TAGS_ERROR } from '../../../constants/TagsConstants';

interface DisplayedTagProps {
  className?: string;
}

const DisplayedTag = ({ className }: DisplayedTagProps) => {
  const [isTagSelectDialogOpen, setIsTagSelectDialogOpen] = useState<boolean>(false);
  const { data: tagsList, status } = useQuery<Tag[]>({
    queryFn: () => getTags(true),
    queryKey: [],
    cacheTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: 'always'
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
      <Box className="displayed-tag-container" sx={{ color: 'white' }}>
        <Button
          sx={{ bgcolor: 'secondary.main' }}
          variant="contained"
          className={className}
          onClick={() => setIsTagSelectDialogOpen((prev) => !prev)}
          startIcon={<TagRounded />}>
          {tagsList && lastViewedDish.tag.name}
        </Button>

        {isTagSelectDialogOpen && (
          <List className="search-list" sx={{ bgcolor: 'secondary.main' }}>
            <ListItem className="tags-list-header">
              <ListItemIcon>
                <SearchRounded sx={{ color: 'text.secondary' }} />
              </ListItemIcon>
              <Input
                value={textFilter}
                disableUnderline
                sx={{ color: 'text.secondary' }}
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
