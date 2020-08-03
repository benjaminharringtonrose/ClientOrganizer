import { SEARCH_TEXT_CHANGED } from "./types";

export const searchTextChanged = (searchText: string) => {
  return {
    type: SEARCH_TEXT_CHANGED,
    payload: searchText,
  };
};
