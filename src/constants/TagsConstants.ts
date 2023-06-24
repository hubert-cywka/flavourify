import {
  MAX_TAGS_NUMBER,
  MIN_TAGS_NUMBER,
  TAG_NAME_MAX_LENGTH,
  TAG_NAME_MIN_LENGTH
} from './NumberConstants';
import { Tag, TagType } from 'types/interfaces/Tag';

export const TAG_DELETE_WARNING = 'This change is irreversible.';
export const TAG_DELETE_ERROR = 'Failed to delete tag. Please try again later';
export const TAG_DELETE_SUCCESS = 'Tag deleted successfully';
export const TAG_DELETE_INFO =
  'Select one tag from list by clicking on it and click button to delete it. All dishes with this tag will have it removed.';

export const TAG_ADD_ERROR_LENGTH = `Failed to add tag. Name has to be at least ${TAG_NAME_MIN_LENGTH} characters long, up to maximum ${TAG_NAME_MAX_LENGTH} characters.`;
export const TAG_ADD_ERROR = 'Failed to add tag. Please try again later';
export const TAG_ADD_ERROR_CONFLICT = 'Tag with same name already exists.';
export const TAG_ADD_SUCCESS = 'Tag added successfully';
export const TAG_ADD_REQUIREMENTS = `Name has to be at least ${TAG_NAME_MIN_LENGTH} characters long, up to maximum ${TAG_NAME_MAX_LENGTH} characters.`;
export const TAG_ADD_INFO =
  'Create new tag for your dishes, propose its name and select one of few available categories, that suits it most.';

export const TAG_UPDATE_ERROR_LENGTH = `Failed to update tag. Name has to be at least ${TAG_NAME_MIN_LENGTH} characters long, up to maximum ${TAG_NAME_MAX_LENGTH} characters.`;
export const TAG_UPDATE_ERROR = 'Failed to update tag. Please try again later';
export const TAG_UPDATE_SUCCESS = 'Tag updated successfully';
export const TAG_UPDATE_INFO =
  'Select one tag from list by clicking on it and update its name. All dishes with this tag will be updated accordingly.';

export const TAGS_SELECTED_INFO = `Please select at least ${MIN_TAGS_NUMBER} tag, up to ${MAX_TAGS_NUMBER} tags that describes this dish best. Select or deselect tag by clicking on it.`;
export const TAGS_SELECTED_ERROR = `You have to select ${MIN_TAGS_NUMBER} - ${MAX_TAGS_NUMBER} tags.`;
export const TAGS_SELECT_IMAGE = '/tags-select.svg';

export const NO_TAGS_IMAGE = '/no-tags.svg';
export const NO_TAGS_ERROR = 'No tags are currently available. Sorry.';
export const EMPTY_TAGS_LIST_ERROR =
  'List of tags is empty. You have to add few tags you can choose from.';
export const TAGS_LIST_FETCH_ERROR =
  'List of tags could not be downloaded from server. Try to reload them again.';

export const TAG_TYPES: TagType[] = ['Cuisine', 'Course', 'Diet', 'Other'];
export const ALL_TAGS: Tag = { name: 'All', id: -1, type: 'Other' };
