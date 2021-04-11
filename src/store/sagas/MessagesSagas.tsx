import firebase from "firebase";
import uuid from "uuid-random";
import { put, select } from "redux-saga/effects";
import {
  sendMessageSucceeded,
  sendMessageFailed,
  fetchMessagesSucceeded,
  fetchMessagesFailed,
} from "../actions/MessagesActions";
import { IStoreState } from "../store";
import { publishToast } from "../actions";
import { NOTIFICATION_TYPE } from "../types";

export function* sendMessageSaga(action: any) {
  try {
    const {
      senderId,
      recipientId,
      threadFirstName,
      threadLastName,
      threadAvatar,
      message,
    } = action.payload;
    const state: IStoreState = yield select();
    const uid = state.user?.user?.uid;
    yield console.log("action.payload --------------", action.payload);
    const messageId = uuid();

    yield firebase
      .firestore()
      .collection("messages")
      .doc(senderId)
      .set(
        {
          [recipientId]: {
            threadId: recipientId,
            threadFirstName,
            threadLastName,
            threadAvatar,
            messages: {
              [messageId]: {
                senderId,
                recipientId,
                messageId,
                message,
                timestamp: Date.now(),
              },
            },
          },
        },
        { merge: true }
      );

    yield firebase
      .firestore()
      .collection("messages")
      .doc(recipientId)
      .set(
        {
          [senderId]: {
            threadId: uid,
            threadFirstName: state.user?.user?.firstName,
            threadLastName: state.user?.user?.lastName,
            threadAvatar: state.user?.user?.avatar,
            messages: {
              [messageId]: {
                senderId: uid,
                recipientId,
                messageId,
                message,
                timestamp: Date.now(),
              },
            },
          },
        },
        { merge: true }
      );

    yield put(sendMessageSucceeded());
    yield put(publishToast(NOTIFICATION_TYPE.SUCCESS, "Message sent."));
  } catch (error) {
    yield put(sendMessageFailed({ error } as any));
    yield console.warn(error.message);
  }
}

export function* fetchMessagesSaga() {
  try {
    const state: IStoreState = yield select();
    const uid = state.user?.user?.uid;
    const messages: any[] = [];
    yield firebase
      .firestore()
      .collection("messages")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const docData = doc.data();
          if (docData) {
            for (const [key, item] of Object.entries(docData)) {
              const messageThread = {
                messageId: item.messageId,
                messages: item.messages,
                timestamp: item.timestamp,
                senderId: item.senderId,
                threadId: item.threadId,
                threadFirstName: item.threadFirstName,
                threadLastName: item.threadLastName,
                threadAvatar: item.threadAvatar,
              };
              messages.push(messageThread);
            }
          }
        } else {
          console.warn("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    yield put(fetchMessagesSucceeded(messages));
  } catch (error) {
    yield put(fetchMessagesFailed({ error } as any));
  }
}
