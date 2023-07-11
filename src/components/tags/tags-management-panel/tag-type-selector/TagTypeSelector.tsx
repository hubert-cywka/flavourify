import { ComponentProps, RefObject } from 'react';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { TAG_TYPES } from 'shared/constants/TagsConstants';
import { TagType } from 'shared/types/Dish';

interface TagTypeSelectorProps extends ComponentProps<'div'> {
  selectedType: TagType;
  onTagTypeChange: (event: SelectChangeEvent) => void; // eslint-disable-line no-unused-vars
  tagTypeRef: RefObject<HTMLInputElement>;
}

const TagTypeSelector = ({
  selectedType,
  onTagTypeChange,
  tagTypeRef,
  className
}: TagTypeSelectorProps) => {
  return (
    <FormControl size="small" className={className}>
      <Select
        value={selectedType}
        sx={{ fontSize: '0.8rem' }}
        onChange={onTagTypeChange}
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

export default TagTypeSelector;
