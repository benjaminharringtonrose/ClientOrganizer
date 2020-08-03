import {
  SELECT_CATEGORY,
  SELECT_SUBCATEGORY,
  SELECT_SUBSUBCATEGORY,
  AGE_CHANGED,
} from "./types";

export const selectCategory = (category: string) => {
  return {
    type: SELECT_CATEGORY,
    category,
  };
};

export const selectSubcategory = (subcategory: string) => {
  return {
    type: SELECT_SUBCATEGORY,
    subcategory,
  };
};

export const selectSubsubcategory = (subsubcategory: string) => {
  return {
    type: SELECT_SUBSUBCATEGORY,
    subsubcategory,
  };
};

export const ageChanged = (age: string) => {
  return {
    type: AGE_CHANGED,
    age,
  };
};
