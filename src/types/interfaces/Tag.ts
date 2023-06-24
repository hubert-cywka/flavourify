export interface Tag {
  id: number;
  name: string;
  type: TagType;
}

export type TagType = 'Cuisine' | 'Course' | 'Diet' | 'Other';
