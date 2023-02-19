import {
  Box,
  Button,
  Dialog,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import './DishTags.scss';
import { CheckCircleOutlineRounded, EditRounded } from '@mui/icons-material';
import { RefObject, useState } from 'react';
import { useUpdateEffect } from '../../../utility/hooks/useUpdateEffect';
import {
  DISH_TAGS_DEFAULT,
  TAGS_SELECTED_ERROR,
  TAGS_SELECTED_INFO,
  MAX_TAGS_NUMBER,
  MIN_TAGS_NUMBER,
  NO_TAGS_ERROR,
  NO_TAGS_IMAGE
} from '../../../constants/Constants';
import { useSnackbar } from 'notistack';
import SettingsBackupRestoreRoundedIcon from '@mui/icons-material/SettingsBackupRestoreRounded';
import { useQuery } from '@tanstack/react-query';
import { TAGS_QUERY } from '../../../constants/QueryConstants';
import { getTags } from '../../../services/TagsService';
import { Tag } from '../../../interfaces/Tag';
import { getCompleteTagsFromTagNames } from '../../../utility/getCompleteTagsFromTagNames';

interface DishTagsProps {
  tags: Tag[];
  editable?: boolean;
  className?: string;
  reference?: RefObject<any>;
}

const DishTags = ({ tags, className, editable, reference }: DishTagsProps) => {
  const { data: tagsList } = useQuery<Tag[]>([TAGS_QUERY], getTags);
  const [displayedTags, setDisplayedTags] = useState<Tag[]>(tags);
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useUpdateEffect(() => {
    setDisplayedTags(tags);
  }, [tags]);

  const handleTagsChange = (e: SelectChangeEvent<string[]>) => {
    const {
      target: { value }
    } = e;
    const newTags = typeof value === 'string' ? value.split(',') : value;
    if (tagsList) setDisplayedTags(getCompleteTagsFromTagNames(newTags, tagsList));
  };

  const handleTagsEditDialogClose = () => {
    if (
      !tagsList?.length ||
      (displayedTags.length <= MAX_TAGS_NUMBER && displayedTags.length >= MIN_TAGS_NUMBER)
    ) {
      setIsEditDialogVisible(false);
    } else {
      enqueueSnackbar(TAGS_SELECTED_ERROR);
    }
  };

  const getDisplayedTagsNames = () => {
    return displayedTags.map((tag) => tag.name);
  };

  return (
    <>
      <Box className={`tags-list-container ${className}`} ref={reference}>
        {displayedTags.map((category, id) => {
          return (
            <Box key={category.name + id} className="tag-chip">
              {category.name}
            </Box>
          );
        })}
        {editable && (
          <Box className="tag-chip" onClick={() => setIsEditDialogVisible(true)}>
            <EditRounded className="tags-edit-icon" /> Edit tags
          </Box>
        )}
      </Box>

      <Dialog
        open={isEditDialogVisible}
        onClose={handleTagsEditDialogClose}
        className="tags-list-dialog">
        {tagsList && tagsList.length ? (
          <FormControl className="tags-select-form">
            <Typography className="tags-select-info">{TAGS_SELECTED_INFO}</Typography>
            <Select
              multiple
              className="tags-select-input"
              value={getDisplayedTagsNames()}
              onChange={handleTagsChange}
              MenuProps={{ className: 'tags-select-menu' }}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex' }}>
                  {selected.map((tags, id) => (
                    <Box key={tags + id} className="tag-chip">
                      {tags}
                    </Box>
                  ))}
                </Box>
              )}>
              {tagsList.map((tags, id) => {
                return (
                  <MenuItem key={tags.name + id} value={tags.name} className="tags-select-option">
                    {tags.name}
                  </MenuItem>
                );
              })}
            </Select>
            <Box className="tags-select-buttons">
              <Button
                size="small"
                className="action-button"
                variant="contained"
                startIcon={<SettingsBackupRestoreRoundedIcon />}
                onClick={() => setDisplayedTags(DISH_TAGS_DEFAULT)}>
                Set default tags
              </Button>
              <Button
                size="small"
                className="action-button"
                variant="contained"
                startIcon={<CheckCircleOutlineRounded />}
                onClick={handleTagsEditDialogClose}>
                Confirm
              </Button>
            </Box>
          </FormControl>
        ) : (
          <Box className="tags-select-form">
            <img src={NO_TAGS_IMAGE} className="error-image" />
            <Typography className="tags-select-info">{NO_TAGS_ERROR}</Typography>
          </Box>
        )}
      </Dialog>
    </>
  );
};

export default DishTags;
