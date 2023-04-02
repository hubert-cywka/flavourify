import { Tag, TagType } from '../../../types/interfaces/Tag';
import { Box, Divider, Skeleton } from '@mui/material';
import './CompleteTagsList.scss';
import { useQuery } from '@tanstack/react-query';
import { ALL_TAGS_QUERY, TAGS_QUERY } from '../../../constants/QueryConstants';
import { getTags } from '../../../services/TagsService';
import { TAG_TYPES } from '../../../constants/TagsConstants';

interface CompleteTagsListProps {
  className?: string;
  onTagSelect: (tag: Tag) => void; // eslint-disable-line no-unused-vars
  selectedTags: Tag[] | null;
}

const CompleteTagsList = ({ className, onTagSelect, selectedTags }: CompleteTagsListProps) => {
  const { data: tags } = useQuery<Tag[]>([TAGS_QUERY, ALL_TAGS_QUERY], () => getTags(false));

  const isTagSelected = (tagToCheck: Tag): boolean => {
    return !!selectedTags?.find((tag: Tag) => tag.id === tagToCheck.id);
  };

  const getListOfTagsByType = (type: TagType) => {
    if (!tags) return getListOfMockupTags(Math.ceil(Math.random() * 5) + 5);
    return tags.map((tag) => {
      if (
        (type === 'Other' && !['Cuisine', 'Course', 'Diet'].includes(tag.type)) ||
        tag.type === type
      )
        return (
          <Box
            key={tag.id}
            className={`tag-chip ${isTagSelected(tag) && 'selected'}`}
            onClick={() => onTagSelect(tag)}>
            {tag.name}
          </Box>
        );
    });
  };

  const getListOfMockupTags = (count: number) => {
    const arrayOfMockups = [];
    for (let i = 0; i < count; i++) {
      const randomWidth = Math.ceil(Math.random() * 50) + 30;
      arrayOfMockups.push(
        <Skeleton key={i} className="tag-chip" width={randomWidth} variant="rectangular" />
      );
    }
    return arrayOfMockups;
  };

  return (
    <Box className={`all-tags-list-container ${className}`} sx={{ color: 'text.secondary' }}>
      {TAG_TYPES.map((type, id) => (
        <Box key={id}>
          <Divider className="tags-divider">{type}</Divider>
          <Box className="tags-container">{getListOfTagsByType(type)}</Box>
        </Box>
      ))}
    </Box>
  );
};

export default CompleteTagsList;
