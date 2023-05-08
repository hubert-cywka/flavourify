import { Box, Button, Dialog, Typography } from '@mui/material';
import './TagsList.scss';
import {
  ArrowForwardRounded,
  CheckCircleOutlineRounded,
  EditRounded,
  RestartAltRounded
} from '@mui/icons-material';
import { RefObject, useEffect, useState } from 'react';
import { MAX_TAGS_NUMBER, MIN_TAGS_NUMBER } from '../../../constants/NumberConstants';
import { useSnackbar } from 'notistack';
import SettingsBackupRestoreRoundedIcon from '@mui/icons-material/SettingsBackupRestoreRounded';
import { Tag } from '../../../types/interfaces/Tag';
import {
  EMPTY_TAGS_LIST_ERROR,
  NO_TAGS_ERROR,
  NO_TAGS_IMAGE,
  TAGS_LIST_FETCH_ERROR,
  TAGS_SELECT_IMAGE,
  TAGS_SELECTED_ERROR,
  TAGS_SELECTED_INFO
} from '../../../constants/TagsConstants';
import { DISH_TAGS_DEFAULT } from '../../../constants/DishesConstants';
import CompleteTagsList from '../complete-tags-list/CompleteTagsList';
import appRouter from '../../router/AppRouter';
import ROUTE from '../../router/RoutingConstants';
import AnimatePresence from '../../animate-presence/AnimatePresence';
import { fluentGrowAnimation } from '../../../constants/AnimationConfigs';
import { useTags } from '../../../utility/hooks/useTags';

interface TagsListProps {
  tags: Tag[];
  editable?: boolean;
  className?: string;
  reference?: RefObject<any>;
}

const TagsList = ({ tags, className, editable, reference }: TagsListProps) => {
  const { data: tagsList, refetch } = useTags(false);
  const [displayedTags, setDisplayedTags] = useState<Tag[]>(tags);
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setDisplayedTags(tags);
  }, [tags, editable]);

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

  const handleTagSelection = (tagToSelect: Tag) => {
    const index = displayedTags.findIndex((tag) => tag.id === tagToSelect.id);
    if (index > -1) {
      const newTags = displayedTags.slice();
      newTags.splice(index, 1);
      setDisplayedTags(newTags);
    } else {
      const newTags = displayedTags.slice();
      newTags.push(tagToSelect);
      if (newTags.length > MAX_TAGS_NUMBER) {
        enqueueSnackbar(TAGS_SELECTED_ERROR);
      } else {
        setDisplayedTags(newTags);
      }
    }
  };

  const compareByName = (a: Tag, b: Tag) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  };

  const getListOfTags = () => {
    return displayedTags
      .slice()
      .sort(compareByName)
      .map((tag, id) => {
        return (
          <Box key={tag.name + id} className="tag-chip">
            {tag.name}
          </Box>
        );
      });
  };

  const buildErrorMessage = () => {
    return (
      <Box
        className="tags-select-form"
        sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
        <Box className="tags-select-form-content">
          <img src={NO_TAGS_IMAGE} className="error-image" />
          <Typography className="tags-select-info-header">{NO_TAGS_ERROR}</Typography>
          {tagsList ? (
            <>
              <Typography className="tags-select-info-description">
                {EMPTY_TAGS_LIST_ERROR}
              </Typography>
              <Button
                className="action-button"
                variant="accentContained"
                startIcon={<ArrowForwardRounded />}
                onClick={() => appRouter.navigate(ROUTE.SETTINGS)}>
                Go to settings
              </Button>
            </>
          ) : (
            <>
              <Typography className="tags-select-info-description">
                {TAGS_LIST_FETCH_ERROR}
              </Typography>
              <Button
                className="action-button"
                variant="accentContained"
                startIcon={<RestartAltRounded />}
                onClick={() => refetch()}>
                Reload
              </Button>
            </>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Box className={`tags-list-container ${className}`} ref={reference}>
        {getListOfTags()}
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
          <Box
            sx={{ bgcolor: 'secondary.dark', color: 'text.primary' }}
            className="tags-select-form">
            <Box className="tags-select-form-content">
              <AnimatePresence isVisible={true} animation={fluentGrowAnimation}>
                <img src={TAGS_SELECT_IMAGE} className="tags-select-info-image" />
              </AnimatePresence>
              <Typography className="tags-select-info-header">Update dish tags</Typography>
              <Typography className="tags-select-info-description">{TAGS_SELECTED_INFO}</Typography>
              <Typography className="selected-tags-text">Already selected:</Typography>
              <Box className="selected-tags">
                {displayedTags.map((tag, id) => (
                  <Box
                    key={tag.name + id}
                    className="tag-chip"
                    onClick={() => handleTagSelection(tag)}>
                    {tag.name}
                  </Box>
                ))}
              </Box>
              <CompleteTagsList
                className="complete-tags-list"
                onTagSelect={handleTagSelection}
                selectedTags={displayedTags}
                sx={{ color: 'text.primary' }}
              />
            </Box>
            <Box className="tags-select-buttons">
              <Button
                className="action-button"
                variant="errorOutlined"
                startIcon={<SettingsBackupRestoreRoundedIcon />}
                onClick={() => setDisplayedTags(DISH_TAGS_DEFAULT)}>
                Clear
              </Button>
              <Button
                className="action-button"
                variant="successOutlined"
                startIcon={<CheckCircleOutlineRounded />}
                onClick={handleTagsEditDialogClose}>
                Save
              </Button>
            </Box>
          </Box>
        ) : (
          buildErrorMessage()
        )}
      </Dialog>
    </>
  );
};

export default TagsList;
