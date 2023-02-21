import { useContext } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import FastfoodRoundedIcon from '@mui/icons-material/FastfoodRounded';
import './DisplayedTagSelector.scss';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { Tag } from '../../../interfaces/Tag';
import { TAGS_QUERY } from '../../../constants/QueryConstants';
import { getTags } from '../../../services/TagsService';
import { selectedTagContext } from '../../../contexts/SelectedTagContext';
import Builder from '../../../utility/Builder';
import { ALL_TAGS, NO_TAGS_ERROR } from '../../../constants/Constants';

interface DisplayedTagSelectorProps {
  className?: string;
}

const DisplayedTagSelector = ({ className }: DisplayedTagSelectorProps) => {
  const { data: tagsList, status } = useQuery<Tag[]>([TAGS_QUERY], getTags);
  const { selectedTag, setSelectedTag } = useContext(selectedTagContext);

  const updateDisplayedTag = (tag: Tag) => {
    setSelectedTag(tag);
  };

  const getQueryResult = () => {
    return Builder.createResult(status)
      .onSuccess(
        <>
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
            tagsList.map((tag, id) => {
              return (
                <ListItem
                  className="selectable-tag"
                  key={tag.name + id}
                  onClick={() => updateDisplayedTag(tag)}>
                  <ListItemText className="selectable-tag-text" disableTypography>
                    {tag.name}
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
        </>
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
    <List
      className={`selectable-tags-list ${className}`}
      sx={{ bgcolor: 'secondary.main', color: 'text.secondary' }}>
      <ListItem className="tags-list-header">
        <ListItemText className="tags-list-header-text" disableTypography>
          Select tag to display
        </ListItemText>
        <ListItemIcon>
          <FastfoodRoundedIcon className="tags-list-header-icon" sx={{ color: 'text.secondary' }} />
        </ListItemIcon>
      </ListItem>
      {getQueryResult()}
    </List>
  );
};

export default DisplayedTagSelector;
