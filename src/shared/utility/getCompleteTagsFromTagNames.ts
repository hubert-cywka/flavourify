import { Tag } from 'shared/types/Dish';

export const getCompleteTagsFromTagNames = (names: string[], tags: Tag[]) => {
  const newParsedTags: Tag[] = [];
  tags.map((tag) => {
    if (names.includes(tag.name)) newParsedTags.push(tag);
  });
  return newParsedTags;
};
