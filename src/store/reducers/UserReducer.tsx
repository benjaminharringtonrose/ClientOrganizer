import { FETCH_USER, DELETE_CLIENT, UPDATE_CLIENT, ADD_CLIENT } from "../actions/types";

const INITIAL_STATE = {
  user: {
    searchText: undefined,
    user: undefined,
    fetchUserLoading: false,
    fetchUserError: false,
    deleteClientLoading: false,
    deleteClientError: false,
    updateClientLoading: false,
    updateClientError: false,
    addClientLoading: false,
    addClientError: false,
  },
};

const UserReducer = (state = INITIAL_STATE, action: any) => {
  console.log(action);
  switch (action.type) {
    case FETCH_USER.REQUESTED:
      return {
        ...state,
        fetchUserLoading: true,
      };
    case FETCH_USER.SUCCEEDED:
      return {
        ...state,
        user: action.payload,
        fetchUserLoading: false,
      };
    case FETCH_USER.FAILED:
      return {
        ...state,
        fetchUserError: action.payload.message,
        password: "",
        fetchUserLoading: false,
      };
    case DELETE_CLIENT.REQUESTED:
      return {
        ...state,
        deleteClientLoading: true,
      };
    case DELETE_CLIENT.SUCCEEDED:
      return {
        ...state,
        deleteClientLoading: false,
      };
    case DELETE_CLIENT.FAILED:
      return {
        ...state,
        deleteClientLoading: false,
        deleteClientError: action.payload.message,
      };
    case UPDATE_CLIENT.REQUESTED:
      return {
        ...state,
        updateClientLoading: true,
      };
    case UPDATE_CLIENT.SUCCEEDED:
      return {
        ...state,
        updateClientLoading: false,
      };
    case UPDATE_CLIENT.FAILED:
      return {
        ...state,
        updateClientLoading: false,
        updateClientError: action.payload.message,
      };
    case ADD_CLIENT.REQUESTED:
      return {
        ...state,
        addClientLoading: true,
      };
    case ADD_CLIENT.SUCCEEDED:
      return {
        ...state,
        addClientLoading: false,
      };
    case ADD_CLIENT.FAILED:
      return {
        ...state,
        addClientLoading: false,
        addClientError: action.payload.message,
      };
    default:
      return state;
  }
};

export default UserReducer;
