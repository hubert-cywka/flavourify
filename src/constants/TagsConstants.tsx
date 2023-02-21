import { Tag, TagType } from '../interfaces/Tag';
import {
  MAX_TAGS_NUMBER,
  MIN_TAGS_NUMBER,
  TAG_NAME_MAX_LENGTH,
  TAG_NAME_MIN_LENGTH
} from './NumberConstants';

export const TAG_DELETE_WARNING = 'This change is irreversible.';
export const TAG_DELETE_ERROR = 'Failed to delete tag. Please try again later';
export const TAG_DELETE_SUCCESS = 'Tag deleted successfully';
export const TAG_DELETE_INFO =
  'Select one tag from list by clicking on it and click button to delete it. All dishes with this tag will have it removed.';

export const TAG_ADD_ERROR_LENGTH = `Failed to add tag. Name has to be at least ${TAG_NAME_MIN_LENGTH} characters long, up to maximum ${TAG_NAME_MAX_LENGTH} characters.`;
export const TAG_ADD_ERROR = 'Failed to add tag. Please try again later';
export const TAG_ADD_SUCCESS = 'Tag added successfully';
export const TAG_ADD_REQUIREMENTS = `Name has to be at least ${TAG_NAME_MIN_LENGTH} characters long, up to maximum ${TAG_NAME_MAX_LENGTH} characters.`;
export const TAG_ADD_INFO =
  'Create new tag for your dishes, propose its name and select one of few available categories, that suits it most.';

export const TAG_UPDATE_ERROR_LENGTH = `Failed to update tag. Name has to be at least ${TAG_NAME_MIN_LENGTH} characters long, up to maximum ${TAG_NAME_MAX_LENGTH} characters.`;
export const TAG_UPDATE_ERROR = 'Failed to update tag. Please try again later';
export const TAG_UPDATE_SUCCESS = 'Tag updated successfully';
export const TAG_UPDATE_INFO =
  'Select one tag from list by clicking on it and update its name or delete it. All dishes with this tag will be updated accordingly.';

export const TAGS_SELECTED_INFO = `Please select ${MIN_TAGS_NUMBER} - ${MAX_TAGS_NUMBER} tags that describes this dish best.`;
export const TAGS_SELECTED_ERROR = `You have to select ${MIN_TAGS_NUMBER} - ${MAX_TAGS_NUMBER} tags.`;

export const NO_TAGS_IMAGE = './no-tags.svg';
export const NO_TAGS_ERROR = 'No tags are currently available. Sorry.';

export const TAG_TYPES: TagType[] = ['Cuisine', 'Course', 'Diet', 'Other'];
export const ALL_TAGS: Tag = { name: 'All', id: -1, type: 'Other' };
