import { useQuery } from '@tanstack/react-query';
import { getTags } from 'services/TagsService';
import {
  ALL_TAGS_QUERY,
  TAGS_QUERY,
  TAGS_WITH_CONTENT_QUERY
} from 'shared/constants/QueryConstants';
import { Tag } from 'shared/types/Dish';

export const useTags = (onlyWithContent: boolean) => {
  const queryKeys: string[] = [
    TAGS_QUERY,
    onlyWithContent ? TAGS_WITH_CONTENT_QUERY : ALL_TAGS_QUERY
  ];

  return useQuery<Tag[]>(queryKeys, () => getTags(onlyWithContent));
};
