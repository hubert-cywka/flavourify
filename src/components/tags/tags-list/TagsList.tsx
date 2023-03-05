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
import { useQuery } from '@tanstack/react-query';
import { TAGS_QUERY } from '../../../constants/QueryConstants';
import { getTags } from '../../../services/TagsService';
import { Tag } from '../../../interfaces/Tag';
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
import { AnimatePresence, motion } from 'framer-motion';
import { TAGS_SELECT_IMAGE_MOTION } from '../../../constants/MotionKeyConstants';

interface TagsListProps {
  tags: Tag[];
  editable?: boolean;
  className?: string;
  reference?: RefObject<any>;
}

const TagsList = ({ tags, className, editable, reference }: TagsListProps) => {
  const { data: tagsList, refetch } = useQuery<Tag[]>([TAGS_QUERY], () => getTags(false));
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
        <Box
          className="tags-select-form"
          sx={{ bgcolor: 'background.default', color: 'text.secondary' }}>
          {tagsList && tagsList.length ? (
            <>
              <AnimatePresence initial={false}>
                <motion.div
                  key={TAGS_SELECT_IMAGE_MOTION}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'fit-content' }}
                  exit={{ opacity: 0, height: 0 }}>
                  <img src={TAGS_SELECT_IMAGE} className="tags-select-info-image" />
                </motion.div>
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
              />
              <Box className="tags-select-buttons">
                <Button
                  className="action-button"
                  variant="errorContained"
                  startIcon={<SettingsBackupRestoreRoundedIcon />}
                  onClick={() => setDisplayedTags(DISH_TAGS_DEFAULT)}>
                  Unselect all
                </Button>
                <Button
                  className="action-button"
                  variant="successContained"
                  startIcon={<CheckCircleOutlineRounded />}
                  onClick={handleTagsEditDialogClose}>
                  Save
                </Button>
              </Box>
            </>
          ) : (
            <>
              <img src={NO_TAGS_IMAGE} className="error-image" />
              <Typography className="tags-select-info-header">{NO_TAGS_ERROR}</Typography>
              <Box>
                {tagsList ? (
                  <>
                    <Typography className="tags-select-info-description">
                      {EMPTY_TAGS_LIST_ERROR}
                    </Typography>
                    <Button
                      className="action-button"
                      variant="contained"
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
                      variant="contained"
                      startIcon={<RestartAltRounded />}
                      onClick={() => refetch()}>
                      Reload
                    </Button>
                  </>
                )}
              </Box>
            </>
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default TagsList;
