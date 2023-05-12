import { DeleteRounded } from '@mui/icons-material';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Button, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { TAGS_QUERY } from '../../../../constants/QueryConstants';
import {
  TAG_DELETE_ERROR,
  TAG_DELETE_INFO,
  TAG_DELETE_SUCCESS,
  TAG_DELETE_WARNING
} from '../../../../constants/TagsConstants';
import { queryClient } from '../../../../services/QueryClient';
import { deleteTag } from '../../../../services/TagsService';
import CompleteTagsList from '../../complete-tags-list/CompleteTagsList';
import { TagsSubPanelProps } from '../TagsManagementPanel';

const TagsRemovePanel = ({
  value,
  selectedTag,
  setSelectedTag,
  isFetching,
  setIsFetching,
  className,
  onTagSelection
}: TagsSubPanelProps) => {
  const removeSelectedTag = () => {
    if (!selectedTag) return;
    setIsFetching(true);
    deleteTag(selectedTag.id)
      .then(() => {
        enqueueSnackbar(TAG_DELETE_SUCCESS, { variant: 'success' });
        setIsFetching(false);
        queryClient.invalidateQueries([TAGS_QUERY]);
        setSelectedTag(null);
      })
      .catch(() => {
        enqueueSnackbar(TAG_DELETE_ERROR, { variant: 'error' });
        setIsFetching(false);
      });
  };

  return (
    <TabPanel value={value} className={className}>
      <Box className="divider">Delete tag</Box>
      <Box className="tags-tab-text">
        <Typography className="info">{TAG_DELETE_INFO}</Typography>
        <Typography className="info requirements">{TAG_DELETE_WARNING}</Typography>
      </Box>
      <Box className="tags-tab-content">
        {selectedTag ? (
          <>
            <Box className="selected-tag">Selected: {selectedTag.name}</Box>
            <Button
              disabled={isFetching}
              className="action-button"
              size="small"
              variant="errorContained"
              startIcon={<DeleteRounded />}
              onClick={removeSelectedTag}>
              Delete
            </Button>
          </>
        ) : (
          <Box className="selected-tag">Select tag you want to delete</Box>
        )}
        <CompleteTagsList
          onTagSelect={onTagSelection}
          selectedTags={selectedTag ? [selectedTag] : null}
        />
      </Box>
    </TabPanel>
  );
};

export default TagsRemovePanel;
