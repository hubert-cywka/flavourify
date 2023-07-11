import { Box } from '@mui/material';
import './TagsList.scss';
import { EditRounded } from '@mui/icons-material';
import { ComponentProps, RefObject, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { MAX_TAGS_NUMBER, MIN_TAGS_NUMBER } from 'shared/constants/NumberConstants';
import { TAGS_SELECTED_ERROR } from 'shared/constants/TagsConstants';
import { Tag } from 'shared/types/Dish';
import { useTags } from 'shared/hooks/queries/useTags';
import DishTagsEditDialog from '../dish-tags-edit-dialog/DishTagsEditDialog';
import { DISH_TAGS_DEFAULT } from 'shared/constants/DishesConstants';
import classNames from 'classnames';

interface TagsListProps extends ComponentProps<'div'> {
  tags: Tag[];
  editable?: boolean;
  reference?: RefObject<any>;
}

const TagsList = ({ tags, className, editable, reference }: TagsListProps) => {
  const { data: tagsList, refetch } = useTags(false);
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

  const compareByName = (a: Tag, b: Tag) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  };

  return (
    <>
      <Box className={classNames('tags-list-container', className)} ref={reference}>
        {displayedTags
          .slice()
          .sort(compareByName)
          .map((tag, id) => {
            return (
              <Box key={tag.name + id} className="tag-chip">
                {tag.name}
              </Box>
            );
          })}
        {editable && (
          <Box className="tag-chip edit-tags-chip" onClick={() => setIsEditDialogVisible(true)}>
            <EditRounded className="tags-edit-icon" /> Edit tags
          </Box>
        )}
      </Box>

      <DishTagsEditDialog
        open={isEditDialogVisible}
        onClose={handleTagsEditDialogClose}
        onClear={() => setDisplayedTags(DISH_TAGS_DEFAULT)}
        onReload={refetch}
        onSelect={handleTagSelection}
        displayedTags={displayedTags}
        availableTags={tagsList}
      />
    </>
  );
};

export default TagsList;
