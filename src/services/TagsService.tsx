import { Tag } from '../interfaces/Tag';
import { apiClient } from './ApiClient';

export const getTags = async (): Promise<Tag[]> => {
  const { data } = await apiClient.get('/tags');
  return data;
};
