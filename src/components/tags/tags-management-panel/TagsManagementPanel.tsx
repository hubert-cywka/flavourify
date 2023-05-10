import { Box, SelectChangeEvent, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Dispatch, SetStateAction, SyntheticEvent, useRef, useState } from 'react';
import { Tag, TagType } from '../../../types/interfaces/Tag';
import './TagsManagementPanel.scss';
import TagsAddPanel from './tags-add-panel/TagsAddPanel';
import TagsEditPanel from './tags-edit-panel/TagsEditPanel';
import TagsRemovePanel from './tags-remove-panel/TagsRemovePanel';

interface TagsManagementPanelProps {
  className?: string;
}

export interface TagsSubPanelProps {
  value: string;
  className?: string;
  isFetching: boolean;
  setIsFetching: Dispatch<SetStateAction<boolean>>;
  selectedType: TagType;
  setSelectedType: Dispatch<SetStateAction<TagType>>;
  selectedTag: Tag | null;
  setSelectedTag: Dispatch<SetStateAction<Tag | null>>;
  onTagSelection: (tag: Tag) => void; // eslint-disable-line no-unused-vars,
  onTagTypeChange: (event: SelectChangeEvent) => void; // eslint-disable-line no-unused-vars
}

const TagsManagementPanel = ({ className }: TagsManagementPanelProps) => {
  const [visibleTab, setVisibleTab] = useState('1');
  const [isFetching, setIsFetching] = useState(false);
  const [selectedType, setSelectedType] = useState<TagType>('Other');
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const tagNameRef = useRef<HTMLInputElement>(null);
  const tagTypeRef = useRef<HTMLInputElement>(null);

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setVisibleTab(newValue);
    setSelectedTag(null);
  };

  const handleTagTypeChange = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value as TagType);
  };

  const handleTagSelection = (tag: Tag) => {
    setSelectedTag(tag);
    setSelectedType(tag.type);
  };

  const getSubPanelProps = () => {
    const props: TagsSubPanelProps = {
      value: '',
      isFetching: isFetching,
      setIsFetching: setIsFetching,
      selectedTag: selectedTag,
      setSelectedTag: setSelectedTag,
      selectedType: selectedType,
      setSelectedType: setSelectedType,
      onTagSelection: handleTagSelection,
      onTagTypeChange: handleTagTypeChange
    };

    return props;
  };

  return (
    <Box className={`tags-management-panel-container ${className}`}>
      <TabContext value={visibleTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} centered>
            <Tab
              sx={{
                color: 'text.primary',
                textTransform: 'none',
                '&.Mui-selected': { color: 'accent.main' }
              }}
              label="Update"
              value="1"
            />
            <Tab
              sx={{
                color: 'text.primary',
                textTransform: 'none',
                '&.Mui-selected': { color: 'accent.main' }
              }}
              label="Add"
              value="2"
            />
            <Tab
              sx={{
                color: 'text.primary',
                textTransform: 'none',
                '&.Mui-selected': { color: 'accent.main' }
              }}
              label="Delete"
              value="3"
            />
          </TabList>
        </Box>

        <TagsEditPanel
          {...getSubPanelProps()}
          value="1"
          className="tags-tab-panel"
          tagTypeRef={tagTypeRef}
          tagNameRef={tagNameRef}
        />

        <TagsAddPanel
          {...getSubPanelProps()}
          value="2"
          className="tags-tab-panel"
          tagTypeRef={tagTypeRef}
          tagNameRef={tagNameRef}
        />

        <TagsRemovePanel {...getSubPanelProps()} value="3" className="tags-tab-panel" />
      </TabContext>
    </Box>
  );
};

export default TagsManagementPanel;
