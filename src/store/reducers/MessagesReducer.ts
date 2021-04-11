import { IError, FETCH_MESSAGES, SEND_MESSAGE } from "../types";
import { IStringMap } from "../../screens/RegisterScreen";

export interface IMessagesState {
  readonly messages?: IStringMap<any>[];
  readonly fetchMessagesLoading: boolean;
  readonly fetchMessagesError?: IError;
  readonly sendMessageLoading: boolean;
  readonly sendMessageError?: IError;
}

export const DefaultMessagesState: IMessagesState = {
  messages: undefined,
  fetchMessagesLoading: false,
  fetchMessagesError: undefined,
  sendMessageLoading: false,
  sendMessageError: undefined,
};

const MessagesReducer = (state = DefaultMessagesState, action: any) => {
  console.log(action);
  switch (action.type) {
    case FETCH_MESSAGES.REQUESTED:
      return {
        ...state,
        fetchMessagesLoading: true,
      };
    case FETCH_MESSAGES.SUCCEEDED:
      return {
        ...state,
        fetchMessagesLoading: false,
        messages: action.payload,
      };
    case FETCH_MESSAGES.FAILED:
      return {
        ...state,
        fetchMessagesLoading: false,
        fetchMessagesError: action.payload.message,
      };
    case SEND_MESSAGE.REQUESTED:
      return {
        ...state,
        sendMessageLoading: true,
      };
    case SEND_MESSAGE.SUCCEEDED:
      return {
        ...state,
        sendMessageLoading: false,
      };
    case SEND_MESSAGE.FAILED:
      return {
        ...state,
        sendMessageLoading: false,
        sendMessageError: action.payload.message,
      };
    default:
      return state;
  }
};

export default MessagesReducer;
