import {
  SELECT_CATEGORY,
  SELECT_SUBCATEGORY,
  SELECT_SUBSUBCATEGORY,
  AGE_CHANGED,
} from "../actions/types";

const INITIAL_STATE = {
  category: undefined,
  subcategory: undefined,
  subsubcategory: undefined,
  age: undefined,
};

const InitialFlowReducer = (state = INITIAL_STATE, action: any) => {
 
  switch (action.type) {
    case SELECT_CATEGORY:
      return {
        ...state,
        category: action.category,
      };
    case SELECT_SUBCATEGORY:
      return {
        ...state,
        subcategory: action.subcategory,
      };
    case SELECT_SUBSUBCATEGORY:
      return {
        ...state,
        subsubcategory: action.subsubcategory,
      };
    case AGE_CHANGED:
      return {
        ...state,
        age: action.age,
      };
    default:
      return state;
  }
};

export default InitialFlowReducer;
