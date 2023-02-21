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
import { Tag } from '../../../interfaces/Tag';
import { TAGS_WITH_CONTENT_QUERY } from '../../../constants/QueryConstants';
import { getTags } from '../../../services/TagsService';
import { selectedTagContext } from '../../../contexts/SelectedTagContext';
import Builder from '../../../utility/Builder';
import { ALL_TAGS, NO_TAGS_ERROR } from '../../../constants/Constants';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

interface DisplayedTagProps {
  className?: string;
}

const DisplayedTag = ({ className }: DisplayedTagProps) => {
  const [isTagSelectDialogOpen, setIsTagSelectDialogOpen] = useState<boolean>(false);
  const { data: tagsList, status } = useQuery<Tag[]>(
    [TAGS_WITH_CONTENT_QUERY],
    () => getTags(true),
    { staleTime: 1000 }
  );
  const { selectedTag, setSelectedTag } = useContext(selectedTagContext);
  const [textFilter, setTextFilter] = useState('');

  const updateDisplayedTag = (tag: Tag) => {
    setSelectedTag(tag);
  };

  const getQueryResult = () => {
    return Builder.createResult(status)
      .onSuccess(
        <Box className="scrollable-tags-holder">
          <ListItem className="selectable-tag" onClick={() => updateDisplayedTag(ALL_TAGS)}>
            <ListItemText className="selectable-tag-text" disableTypography>
              {ALL_TAGS.name}
            </ListItemText>
            {ALL_TAGS.id === selectedTag.id && (
              <ListItemIcon>
                <DoneRoundedIcon className="selected-tag-icon" sx={{ color: 'text.secondary' }} />
              </ListItemIcon>
            )}
          </ListItem>
          {tagsList &&
            tagsList.map((tag) => {
              if (!textFilter || tag.name.toLowerCase().includes(textFilter.toLowerCase()))
                return (
                  <ListItem
                    className="selectable-tag"
                    key={tag.id}
                    onClick={() => updateDisplayedTag(tag)}>
                    <ListItemText className="selectable-tag-text" disableTypography>
                      <Box className="tag-name">{tag.name}</Box>
                      <Box className="tag-type">{tag.type}</Box>
                    </ListItemText>
                    {tag.id === selectedTag.id && (
                      <ListItemIcon>
                        <DoneRoundedIcon
                          className="selected-tag-icon"
                          sx={{ color: 'text.secondary' }}
                        />
                      </ListItemIcon>
                    )}
                  </ListItem>
                );
            })}
        </Box>
      )
      .onError(
        <ListItem className="selectable-tag">
          <ListItemText className="selectable-tag-text" disableTypography>
            {NO_TAGS_ERROR}
          </ListItemText>
        </ListItem>
      )
      .build();
  };

  return (
    <ClickAwayListener onClickAway={() => setIsTagSelectDialogOpen(false)}>
      <Box className="holder">
        <Box
          className={`displayed-tag-container ${className}`}
          sx={{ color: 'text.secondary' }}
          onClick={() => setIsTagSelectDialogOpen((prev) => !prev)}>
          <TagRounded className="displayed-tag-icon" />
          {tagsList && selectedTag.name}
        </Box>

        {isTagSelectDialogOpen && (
          <List
            className="selectable-tags-list"
            sx={{ bgcolor: 'secondary.main', color: 'text.secondary' }}>
            <ListItem className="tags-list-header">
              <Input
                value={textFilter}
                sx={{ color: 'text.secondary' }}
                onChange={(e) => setTextFilter(e.target.value)}
                placeholder="Search tags..."
                className="tags-search-input"
              />
              <ListItemIcon>
                <SearchRounded className="tags-list-header-icon" sx={{ color: 'text.secondary' }} />
              </ListItemIcon>
            </ListItem>
            {getQueryResult()}
          </List>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default DisplayedTag;
