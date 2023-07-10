import { apiClient } from './ApiClient';
import { Tag, TagType } from 'shared/types/Dish';

export const getTags = async (onlyWithContent?: boolean): Promise<Tag[]> => {
  const { data } = await apiClient.get(`/tags?withContent=${onlyWithContent}`);
  return data;
};

export const createTag = async (tagName: string, tagType: TagType): Promise<Tag> => {
  const { data } = await apiClient.post<Tag>('/tags', { name: tagName, type: tagType });
  return data;
};

export const deleteTag = async (tagId: number) => {
  const { data } = await apiClient.delete<Tag>(`/tags/${tagId}`);
  return data;
};

export const updateTag = async (tag: Tag): Promise<Tag> => {
  const { data } = await apiClient.put<Tag>(`/tags/${tag.id}`, tag);
  return data;
};
