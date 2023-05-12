import { RefObject } from 'react';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Button, Input, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { TAG_NAME_MAX_LENGTH, TAG_NAME_MIN_LENGTH } from '../../../../constants/NumberConstants';
import { TAGS_QUERY } from '../../../../constants/QueryConstants';
import {
  TAG_ADD_REQUIREMENTS,
  TAG_UPDATE_ERROR,
  TAG_UPDATE_ERROR_LENGTH,
  TAG_UPDATE_INFO,
  TAG_UPDATE_SUCCESS
} from '../../../../constants/TagsConstants';
import { queryClient } from '../../../../services/QueryClient';
import { updateTag } from '../../../../services/TagsService';
import { getName, getType } from '../../../../utility/tagsUtils';
import CompleteTagsList from '../../complete-tags-list/CompleteTagsList';
import TagTypeSelector from '../tag-type-selector/TagTypeSelector';
import { TagsSubPanelProps } from '../TagsManagementPanel';

interface TagsEditPanelProps extends TagsSubPanelProps {
  tagNameRef: RefObject<HTMLInputElement>;
  tagTypeRef: RefObject<HTMLInputElement>;
}

const TagsEditPanel = ({
  value,
  tagNameRef,
  tagTypeRef,
  className,
  selectedTag,
  setSelectedTag,
  selectedType,
  setIsFetching,
  isFetching,
  onTagSelection,
  onTagTypeChange
}: TagsEditPanelProps) => {
  const updateSelectedTag = () => {
    if (!selectedTag) return;
    const name = getName(tagNameRef);
    if (name.length < TAG_NAME_MIN_LENGTH || name.length > TAG_NAME_MAX_LENGTH) {
      return enqueueSnackbar(TAG_UPDATE_ERROR_LENGTH);
    }

    setIsFetching(true);
    updateTag({ name: name, type: getType(tagTypeRef), id: selectedTag.id })
      .then(() => {
        enqueueSnackbar(TAG_UPDATE_SUCCESS, { variant: 'success' });
        setIsFetching(false);
        queryClient.invalidateQueries([TAGS_QUERY]);
        setSelectedTag(null);
      })
      .catch(() => {
        enqueueSnackbar(TAG_UPDATE_ERROR, { variant: 'error' });
        setIsFetching(false);
      });
  };

  return (
    <TabPanel value={value} className={className}>
      <Box className="divider">Update existing tag</Box>
      <Box className="tags-tab-text">
        <Typography className="info">{TAG_UPDATE_INFO}</Typography>
        <Typography className="info requirements">{TAG_ADD_REQUIREMENTS}</Typography>
      </Box>
      <Box className="tags-tab-content">
        {selectedTag ? (
          <>
            <Box className="tag-inputs-container">
              <Input
                defaultValue={selectedTag?.name}
                inputRef={tagNameRef}
                className="tag-name-input"
              />
              <TagTypeSelector
                className="tag-type-selector"
                selectedType={selectedType}
                onTagTypeChange={onTagTypeChange}
                tagTypeRef={tagTypeRef}
              />
            </Box>
            <Button
              disabled={isFetching}
              className="action-button"
              size="small"
              variant="successContained"
              startIcon={<CheckCircleOutlineRoundedIcon />}
              onClick={updateSelectedTag}>
              Submit
            </Button>
          </>
        ) : (
          <Box className="selected-tag">Select tag you want to update</Box>
        )}
        <CompleteTagsList
          onTagSelect={onTagSelection}
          selectedTags={selectedTag ? [selectedTag] : null}
        />
      </Box>
    </TabPanel>
  );
};

export default TagsEditPanel;
