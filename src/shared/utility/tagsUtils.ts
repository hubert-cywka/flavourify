import { RefObject } from 'react';
import { TagType } from 'shared/types/Dish';

export const getName = (tagNameRef: RefObject<HTMLInputElement>): string => {
  if (!tagNameRef?.current) return '';
  return tagNameRef.current.value;
};

export const getType = (tagTypeRef: RefObject<HTMLInputElement>): TagType => {
  if (!tagTypeRef?.current) return 'Other';
  return tagTypeRef.current.value as TagType;
};
