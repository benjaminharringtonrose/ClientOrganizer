// AUTH ACTION CREATORS

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  AVATAR_CHANGED,
} from "./types";

export const firstNameChanged = (firstName: string) => {
  return {
    type: FIRST_NAME_CHANGED,
    payload: firstName,
  };
};

export const lastNameChanged = (lastName: string) => {
  return {
    type: LAST_NAME_CHANGED,
    payload: lastName,
  };
};

export const emailChanged = (email: string) => {
  return {
    type: EMAIL_CHANGED,
    payload: email,
  };
};

export const passwordChanged = (password: string) => {
  return {
    type: PASSWORD_CHANGED,
    payload: password,
  };
};

export const avatarChanged = (uri: string) => {
  return {
    type: AVATAR_CHANGED,
    payload: uri,
  };
};
