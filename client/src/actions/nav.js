import { CURRENT_TITLE } from '../constants/action-types';

export const setTitle = title => ({
    type: CURRENT_TITLE,
    title
});
