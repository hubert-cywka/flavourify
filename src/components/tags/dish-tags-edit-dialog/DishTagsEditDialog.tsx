import { Box, Button, Dialog, Grow, Typography } from '@mui/material';
import {
  EMPTY_TAGS_LIST_ERROR,
  NO_TAGS_ERROR,
  NO_TAGS_IMAGE,
  TAGS_LIST_FETCH_ERROR,
  TAGS_SELECT_IMAGE,
  TAGS_SELECTED_INFO
} from 'shared/constants/TagsConstants';
import CompleteTagsList from '../complete-tags-list/CompleteTagsList';
import SettingsBackupRestoreRoundedIcon from '@mui/icons-material/SettingsBackupRestoreRounded';
import {
  ArrowForwardRounded,
  CheckCircleOutlineRounded,
  RestartAltRounded
} from '@mui/icons-material';
import { Tag } from 'shared/types/Dish';
import appRouter from 'router/AppRouter';
import ROUTE from 'router/RoutingConstants';
import './DishTagsEditDialog.scss';

interface TagsSelectDialogProps {
  open: boolean;
  onClose: () => void;
  onClear: () => void;
  onReload: () => void;
  onSelect: (tag: Tag) => void; // eslint-disable-line no-unused-vars
  displayedTags: Tag[];
  availableTags?: Tag[];
}

const DishTagsEditDialog = ({
  open,
  onClose,
  onClear,
  onReload,
  availableTags,
  displayedTags,
  onSelect
}: TagsSelectDialogProps) => {
  const buildErrorMessage = () => {
    return (
      <Box
        className="tags-select-form"
        sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
        <Box className="tags-select-form-content">
          <img src={NO_TAGS_IMAGE} className="error-image" />
          <Typography className="tags-select-info-header">{NO_TAGS_ERROR}</Typography>
          {availableTags ? (
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
                onClick={onReload}>
                Reload
              </Button>
            </>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} className="tags-list-dialog">
      {availableTags && availableTags.length ? (
        <Box sx={{ bgcolor: 'secondary.dark', color: 'text.primary' }} className="tags-select-form">
          <Box className="tags-select-form-content">
            <Grow in={true}>
              <Box>
                <img src={TAGS_SELECT_IMAGE} className="tags-select-info-image" />
              </Box>
            </Grow>
            <Typography className="tags-select-info-header">Update dish tags</Typography>
            <Typography className="tags-select-info-description">{TAGS_SELECTED_INFO}</Typography>
            <Typography className="selected-tags-text">Already selected:</Typography>
            <Box className="selected-tags">
              {displayedTags.map((tag, id) => (
                <Box key={tag.name + id} className="tag-chip" onClick={() => onSelect(tag)}>
                  {tag.name}
                </Box>
              ))}
            </Box>
            <CompleteTagsList
              className="complete-tags-list"
              onTagSelect={onSelect}
              selectedTags={displayedTags}
              sx={{ color: 'text.primary' }}
            />
          </Box>
          <Box className="tags-select-buttons">
            <Button
              className="action-button"
              variant="errorOutlined"
              startIcon={<SettingsBackupRestoreRoundedIcon />}
              onClick={onClear}>
              Clear
            </Button>
            <Button
              className="action-button"
              variant="successOutlined"
              startIcon={<CheckCircleOutlineRounded />}
              onClick={onClose}>
              Save
            </Button>
          </Box>
        </Box>
      ) : (
        buildErrorMessage()
      )}
    </Dialog>
  );
};

export default DishTagsEditDialog;
