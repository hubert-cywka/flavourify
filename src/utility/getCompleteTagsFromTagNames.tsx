import { Tag } from '../interfaces/Tag';
import { useQuery } from '@tanstack/react-query';
import { TAGS_QUERY } from '../constants/QueryConstants';
import { getTags } from '../services/TagsService';

export const getCompleteTagsFromTagNames = (names: string[]) => {
  const { data: tagsList } = useQuery<Tag[]>([TAGS_QUERY], getTags);

  const newParsedTags: Tag[] = [];
  tagsList?.map((tag) => {
    if (names.includes(tag.name)) newParsedTags.push(tag);
  });
  return newParsedTags;
};
