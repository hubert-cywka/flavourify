import { useQuery } from '@tanstack/react-query';
import { ALL_TAGS_QUERY, TAGS_QUERY, TAGS_WITH_CONTENT_QUERY } from 'constants/QueryConstants';
import { getTags } from 'services/TagsService';
import { Tag } from 'types/interfaces/Tag';

export const useTags = (onlyWithContent: boolean) => {
  const queryKeys: string[] = [
    TAGS_QUERY,
    onlyWithContent ? TAGS_WITH_CONTENT_QUERY : ALL_TAGS_QUERY
  ];

  return useQuery<Tag[]>(queryKeys, () => getTags(onlyWithContent));
};
