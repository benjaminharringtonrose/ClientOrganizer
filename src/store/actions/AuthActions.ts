import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "../types";

// LOGIN USER - ACTIONS

export function loginUserSucceeded(data: any) {
  return {
    type: LOGIN_USER.SUCCEEDED,
    payload: data,
  };
}

export function loginUserFailed(error: any) {
  return {
    type: LOGIN_USER.FAILED,
    payload: error,
  };
}

// LOGOUT USER - ACTIONS

export function logoutUserSucceeded() {
  return {
    type: LOGOUT_USER.SUCCEEDED,
  };
}

export function logoutUserFailed(error: any) {
  return {
    type: LOGOUT_USER.FAILED,
    payload: error,
  };
}

// REGISTER USER - ACTIONS

export function registerUserSucceeded(data: any) {
  return {
    type: REGISTER_USER.SUCCEEDED,
    payload: data,
  };
}

export function registerUserFailed(error: any) {
  return {
    type: REGISTER_USER.FAILED,
    payload: error,
  };
}
