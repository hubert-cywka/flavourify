import { Box, Divider, Skeleton, SxProps } from '@mui/material';
import { Tag, TagType } from 'shared/types/Dish';
import './CompleteTagsList.scss';
import { TAG_TYPES } from 'shared/constants/TagsConstants';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { useTags } from 'shared/hooks/queries/useTags';
import classNames from 'classnames';
import { ComponentProps } from 'react';

interface CompleteTagsListProps extends ComponentProps<'div'> {
  onTagSelect: (tag: Tag) => void; // eslint-disable-line no-unused-vars
  selectedTags: Tag[] | null;
  sx?: SxProps;
}

const CompleteTagsList = ({ className, onTagSelect, selectedTags, sx }: CompleteTagsListProps) => {
  const { data: tags } = useTags(false);

  const isTagSelected = (tagToCheck: Tag): boolean => {
    return !!selectedTags?.find((tag: Tag) => tag.id === tagToCheck.id);
  };

  const getListOfTagsByType = (type: TagType) => {
    if (!tags) return getListOfMockupTags(Math.ceil(Math.random() * 5) + 5);
    const organizedTagChips: ReactJSXElement[] = [];
    tags.forEach((tag) => {
      if (
        (type === 'Other' && !['Cuisine', 'Course', 'Diet'].includes(tag.type)) ||
        tag.type === type
      )
        organizedTagChips.push(
          <Box
            key={tag.id}
            className={classNames('tag-chip', { selected: isTagSelected(tag) })}
            onClick={() => onTagSelect(tag)}>
            {tag.name}
          </Box>
        );
    });
    return organizedTagChips;
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

  const buildTagsTypeSection = (type: TagType) => {
    const tags = getListOfTagsByType(type);
    if (tags.length) {
      return (
        <>
          <Divider className="tags-divider">{type}</Divider>
          <Box className="tags-container">{tags}</Box>
        </>
      );
    }
  };

  return (
    <Box className={classNames('all-tags-list-container', className)} sx={sx}>
      {TAG_TYPES.map((type, id) => (
        <Box key={id}>{buildTagsTypeSection(type)}</Box>
      ))}
    </Box>
  );
};

export default CompleteTagsList;
