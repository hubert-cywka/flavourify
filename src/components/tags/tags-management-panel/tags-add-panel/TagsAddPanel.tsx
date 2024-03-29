import { RefObject } from 'react';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { TabPanel } from '@mui/lab';
import { Box, Button, Input, Typography } from '@mui/material';
import { AxiosError, HttpStatusCode } from 'axios';
import { enqueueSnackbar } from 'notistack';
import { TAG_NAME_MAX_LENGTH, TAG_NAME_MIN_LENGTH } from 'shared/constants/NumberConstants';
import { TAGS_QUERY } from 'shared/constants/QueryConstants';
import {
  TAG_ADD_ERROR,
  TAG_ADD_ERROR_CONFLICT,
  TAG_ADD_ERROR_LENGTH,
  TAG_ADD_INFO,
  TAG_ADD_REQUIREMENTS,
  TAG_ADD_SUCCESS
} from 'shared/constants/TagsConstants';
import { queryClient } from 'services/QueryClient';
import { createTag } from 'services/TagsService';
import { getName, getType } from 'shared/utility/tagsUtils';
import TagTypeSelector from 'components/tags/tags-management-panel/tag-type-selector/TagTypeSelector';
import { TagsSubPanelProps } from 'components/tags/tags-management-panel/TagsManagementPanel';

interface TagsAddPanelProps extends TagsSubPanelProps {
  tagNameRef: RefObject<HTMLInputElement>;
  tagTypeRef: RefObject<HTMLInputElement>;
}

const TagsAddPanel = ({
  value,
  tagNameRef,
  tagTypeRef,
  className,
  selectedType,
  isFetching,
  setIsFetching,
  onTagTypeChange
}: TagsAddPanelProps) => {
  const createNewTag = () => {
    const name = getName(tagNameRef);
    if (name.length < TAG_NAME_MIN_LENGTH || name.length > TAG_NAME_MAX_LENGTH) {
      return enqueueSnackbar(TAG_ADD_ERROR_LENGTH);
    }

    setIsFetching(true);
    createTag(name, getType(tagTypeRef))
      .then(() => {
        enqueueSnackbar(TAG_ADD_SUCCESS, { variant: 'success' });
        setIsFetching(false);
        if (tagNameRef.current) tagNameRef.current.value = '';
        queryClient.invalidateQueries([TAGS_QUERY]);
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === HttpStatusCode.Conflict) {
          enqueueSnackbar(TAG_ADD_ERROR_CONFLICT, { variant: 'error' });
        } else {
          enqueueSnackbar(TAG_ADD_ERROR, { variant: 'error' });
        }
        setIsFetching(false);
      });
  };

  return (
    <TabPanel value={value} className={className}>
      <Box className="divider">Add new tag</Box>
      <Box className="tags-tab-text">
        <Typography className="info">{TAG_ADD_INFO}</Typography>
        <Typography className="info requirements">{TAG_ADD_REQUIREMENTS}</Typography>
      </Box>
      <Box className="tags-tab-content">
        <Box className="tag-inputs-container">
          <Input inputRef={tagNameRef} className="tag-name-input" placeholder="New tag name" />
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
          startIcon={<AddCircleOutlineRoundedIcon />}
          onClick={createNewTag}>
          Submit
        </Button>
      </Box>
    </TabPanel>
  );
};

export default TagsAddPanel;
