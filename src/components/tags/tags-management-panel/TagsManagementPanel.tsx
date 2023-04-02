import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Typography
} from '@mui/material';
import { TAGS_QUERY } from '../../../constants/QueryConstants';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { SyntheticEvent, useRef, useState } from 'react';
import { useSnackbar } from 'notistack';
import { createTag, deleteTag, updateTag } from '../../../services/TagsService';
import { Tag, TagType } from '../../../types/interfaces/Tag';
import { DeleteRounded } from '@mui/icons-material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import './TagsManagementPanel.scss';
import { queryClient } from '../../../services/QueryClient';
import {
  TAG_ADD_ERROR,
  TAG_ADD_ERROR_CONFLICT,
  TAG_ADD_ERROR_LENGTH,
  TAG_ADD_INFO,
  TAG_ADD_REQUIREMENTS,
  TAG_ADD_SUCCESS,
  TAG_DELETE_ERROR,
  TAG_DELETE_INFO,
  TAG_DELETE_SUCCESS,
  TAG_DELETE_WARNING,
  TAG_TYPES,
  TAG_UPDATE_ERROR,
  TAG_UPDATE_ERROR_LENGTH,
  TAG_UPDATE_INFO,
  TAG_UPDATE_SUCCESS
} from '../../../constants/TagsConstants';
import { TAG_NAME_MAX_LENGTH, TAG_NAME_MIN_LENGTH } from '../../../constants/NumberConstants';
import CompleteTagsList from '../complete-tags-list/CompleteTagsList';
import { AxiosError, HttpStatusCode } from 'axios';

interface TagsManagementPanelProps {
  className?: string;
}

const TagsManagementPanel = ({ className }: TagsManagementPanelProps) => {
  const [selectedType, setSelectedType] = useState<TagType>('Other');
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [visibleTab, setVisibleTab] = useState('1');
  const [isFetching, setIsFetching] = useState(false);

  const tagNameRef = useRef<HTMLInputElement>(null);
  const tagTypeRef = useRef<HTMLInputElement>(null);

  const { enqueueSnackbar } = useSnackbar();

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setVisibleTab(newValue);
    setSelectedTag(null);
  };

  const handleTagTypeChange = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value as TagType);
  };

  const getName = (): string => {
    if (!tagNameRef?.current) return '';
    return tagNameRef.current.value;
  };

  const getType = (): TagType => {
    if (!tagTypeRef?.current) return 'Other';
    return tagTypeRef.current.value as TagType;
  };

  const createNewTag = () => {
    const name = getName();
    if (name.length < TAG_NAME_MIN_LENGTH || name.length > TAG_NAME_MAX_LENGTH) {
      enqueueSnackbar(TAG_ADD_ERROR_LENGTH);
      return;
    }

    setIsFetching(true);
    createTag(name, getType())
      .then(() => {
        enqueueSnackbar(TAG_ADD_SUCCESS, { variant: 'success' });
        setIsFetching(false);
        if (tagNameRef.current) tagNameRef.current.value = '';
        queryClient.invalidateQueries([TAGS_QUERY]);
      })
      .catch((err: AxiosError) => {
        console.log(err);
        if (err.response?.status === HttpStatusCode.Conflict) {
          enqueueSnackbar(TAG_ADD_ERROR_CONFLICT, { variant: 'error' });
        } else {
          enqueueSnackbar(TAG_ADD_ERROR, { variant: 'error' });
        }
        setIsFetching(false);
      });
  };

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

  const updateSelectedTag = () => {
    if (!selectedTag) return;
    const name = getName();
    if (name.length < TAG_NAME_MIN_LENGTH || name.length > TAG_NAME_MAX_LENGTH) {
      enqueueSnackbar(TAG_UPDATE_ERROR_LENGTH);
      return;
    }

    setIsFetching(true);
    updateTag({ name: name, type: getType(), id: selectedTag.id })
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

  const handleTagSelection = (tag: Tag) => {
    setSelectedTag(tag);
    setSelectedType(tag.type);
  };

  const getTagTypeSelector = () => {
    return (
      <FormControl size="small" className="tag-type-selector">
        <Select
          value={selectedType}
          sx={{ fontSize: '0.8rem', color: 'text.secondary' }}
          onChange={handleTagTypeChange}
          inputRef={tagTypeRef}>
          {TAG_TYPES.map((type, id) => (
            <MenuItem
              key={id}
              sx={{ color: 'text.secondary' }}
              className="tag-type-menu-item"
              value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <Box className={`tags-management-panel-container ${className}`}>
      <TabContext value={visibleTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} centered>
            <Tab
              sx={{
                textTransform: 'none',
                '&.Mui-selected': { color: 'accent.main' }
              }}
              label="Update"
              value="1"
            />
            <Tab
              sx={{
                textTransform: 'none',
                '&.Mui-selected': { color: 'accent.main' }
              }}
              label="Add"
              value="2"
            />
            <Tab
              sx={{
                textTransform: 'none',
                '&.Mui-selected': { color: 'accent.main' }
              }}
              label="Delete"
              value="3"
            />
          </TabList>
        </Box>

        <TabPanel value="1" className="tags-tab-panel">
          <Divider className="divider">Update existing tag</Divider>
          <Box className="tags-tab-text">
            <Typography className="info">{TAG_UPDATE_INFO}</Typography>
            <Typography className="info requirements">{TAG_ADD_REQUIREMENTS}</Typography>
          </Box>
          <Box className="tags-tab-content">
            {selectedTag ? (
              <>
                <Box className="tag-inputs-container">
                  <Input
                    sx={{ color: 'text.secondary' }}
                    inputRef={tagNameRef}
                    className="tag-name-input"
                    placeholder={selectedTag?.name}
                  />
                  {getTagTypeSelector()}
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
              onTagSelect={handleTagSelection}
              selectedTags={selectedTag ? [selectedTag] : null}
            />
          </Box>
        </TabPanel>

        <TabPanel value="2" className="tags-tab-panel">
          <Divider className="divider">Add new tag</Divider>
          <Box className="tags-tab-text">
            <Typography className="info">{TAG_ADD_INFO}</Typography>
            <Typography className="info requirements">{TAG_ADD_REQUIREMENTS}</Typography>
          </Box>
          <Box className="tags-tab-content">
            <Box className="tag-inputs-container">
              <Input
                sx={{ color: 'text.secondary' }}
                inputRef={tagNameRef}
                className="tag-name-input"
                placeholder="New tag name"
              />
              {getTagTypeSelector()}
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

        <TabPanel value="3" className="tags-tab-panel">
          <Divider className="divider">Delete tag</Divider>
          <Box className="tags-tab-text">
            <Typography className="info">{TAG_DELETE_INFO}</Typography>
            <Typography className="info requirements">{TAG_DELETE_WARNING}</Typography>
          </Box>
          <Box className="tags-tab-content">
            {selectedTag ? (
              <>
                <Box className="selected-tag">Selected: {selectedTag.name}</Box>
                <Button
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
              onTagSelect={handleTagSelection}
              selectedTags={selectedTag ? [selectedTag] : null}
            />
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default TagsManagementPanel;
