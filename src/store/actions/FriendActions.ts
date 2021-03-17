import { put } from "redux-saga/effects";
import { FETCH_ALL_FRIENDS, ADD_FRIEND, DELETE_FRIEND } from "../types";

// FETCH ALL FRIENDS - ACTIONS AND SAGA

export const addFriendSucceeded = () => ({
  type: ADD_FRIEND.SUCCEEDED,
});

export const addFriendFailed = (error: any) => ({
  type: ADD_FRIEND.FAILED,
  payload: error,
});

export const fetchAllFriendsSucceeded = () => ({
  type: FETCH_ALL_FRIENDS.SUCCEEDED,
});

export const fetchAllFriendsFailed = (error: any) => ({
  type: FETCH_ALL_FRIENDS.FAILED,
  payload: error,
});

export const deleteFriendSucceeded = () => ({
  type: DELETE_FRIEND.SUCCEEDED,
});

export const deleteFriendFailed = (error: any) => ({
  type: DELETE_FRIEND.FAILED,
  payload: error,
});
