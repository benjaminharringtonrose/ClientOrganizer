import {
  FETCH_USER_REQUESTED,
  FETCH_USER_SUCCEEDED,
  FETCH_USER_FAILED,
  DELETE_CLIENT_REQUESTED,
  DELETE_CLIENT_SUCCEEDED,
  DELETE_CLIENT_FAILED,
  UPDATE_CLIENT,
  ADD_CLIENT_REQUESTED,
  ADD_CLIENT_SUCCEEDED,
  ADD_CLIENT_FAILED,
} from "../actions/types";

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
  console.log(state, action);
  switch (action.type) {
    case FETCH_USER_REQUESTED:
      return {
        ...state,
        fetchUserLoading: true,
      };
    case FETCH_USER_SUCCEEDED:
      return {
        ...state,
        user: action.payload,
        fetchUserLoading: false,
      };
    case FETCH_USER_FAILED:
      return {
        ...state,
        fetchUserError: action.payload.message,
        password: "",
        fetchUserLoading: false,
      };
    case DELETE_CLIENT_REQUESTED:
      return {
        ...state,
        deleteClientLoading: true,
      };
    case DELETE_CLIENT_SUCCEEDED:
      return {
        ...state,
        deleteClientLoading: false,
      };
    case DELETE_CLIENT_FAILED:
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
    case ADD_CLIENT_REQUESTED:
      return {
        ...state,
        addClientLoading: true,
      };
    case ADD_CLIENT_SUCCEEDED:
      return {
        ...state,
        addClientLoading: false,
      };
    case ADD_CLIENT_FAILED:
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
