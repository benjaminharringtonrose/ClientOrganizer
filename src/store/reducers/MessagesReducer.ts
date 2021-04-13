import { IError, FETCH_MESSAGES, SEND_MESSAGE, FETCH_THREADS } from "../types";
import { IStringMap } from "../../screens/RegisterScreen";
import { IMessagesActions } from "../actions/MessagesActions";

export interface IMessagesState {
  readonly messages?: IStringMap<any>[];
  readonly threads?: IStringMap<any>[];
  readonly fetchMessagesLoading: boolean;
  readonly fetchMessagesError?: IError;
  readonly fetchThreadsLoading: boolean;
  readonly fetchThreadsError?: IError;
  readonly sendMessageLoading: boolean;
  readonly sendMessageError?: IError;
}

export const DefaultMessagesState: IMessagesState = {
  messages: undefined,
  threads: undefined,
  fetchMessagesLoading: false,
  fetchMessagesError: undefined,
  fetchThreadsLoading: false,
  fetchThreadsError: undefined,
  sendMessageLoading: false,
  sendMessageError: undefined,
};

export const MessagesReducer = (
  state = DefaultMessagesState,
  action: IMessagesActions
): IMessagesState => {
  switch (action.type) {
    // FETCH THREADS
    case FETCH_THREADS.REQUESTED:
      return {
        ...state,
        fetchThreadsLoading: true,
      };
    case FETCH_THREADS.SUCCEEDED:
      return {
        ...state,
        fetchThreadsLoading: false,
        threads: action.payload,
      };
    case FETCH_THREADS.FAILED:
      return {
        ...state,
        fetchThreadsLoading: false,
        fetchThreadsError: action.payload,
      };
    // FETCH MESSAGES
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
        fetchMessagesError: action.payload,
      };
    // SEND MESSAGE
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
        sendMessageError: action.payload,
      };
    default:
      return state;
  }
};
