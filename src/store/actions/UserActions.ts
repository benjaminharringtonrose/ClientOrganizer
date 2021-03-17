import { FETCH_USER, FETCH_ALL_USERS } from "../types";

// FETCH USER - ACTIONS

export function fetchUserRequested(data: any) {
  return {
    type: FETCH_USER.REQUESTED,
    payload: data,
  };
}

export function fetchUserSucceeded(data: any) {
  return {
    type: FETCH_USER.SUCCEEDED,
    payload: data,
  };
}
export function fetchUserFailed(error: any) {
  return {
    type: FETCH_USER.FAILED,
    payload: error,
  };
}

// FETCH ALL USERS - ACTIONS

export function fetchAllUsersRequested() {
  return {
    type: FETCH_ALL_USERS.REQUESTED,
  };
}

export function fetchAllUsersSucceeded(data: any) {
  return {
    type: FETCH_ALL_USERS.SUCCEEDED,
    payload: data,
  };
}
export function fetchAllUsersFailed(error: any) {
  return {
    type: FETCH_ALL_USERS.FAILED,
    payload: error,
  };
}
