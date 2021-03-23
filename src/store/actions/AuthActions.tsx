// AUTH ACTION CREATORS

import { AVATAR_CHANGED } from "./types";

export const avatarChanged = (uri: string) => {
  return {
    type: AVATAR_CHANGED,
    payload: uri,
  };
};
