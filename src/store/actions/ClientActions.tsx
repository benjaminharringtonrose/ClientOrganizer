import {
  CLIENT_NAME_CHANGED,
  CLIENT_ADDRESS_CHANGED,
  CLIENT_PHONE_NUMBER_CHANGED,
  CLIENT_EMAIL_CHANGED,
  CLIENT_NOTES_CHANGED,
} from "./types";

export const clientNameChanged = (clientName: string) => {
  return {
    type: CLIENT_NAME_CHANGED,
    payload: clientName,
  };
};

export const clientAddressChanged = (clientAddress: string) => {
  return {
    type: CLIENT_ADDRESS_CHANGED,
    payload: clientAddress,
  };
};

export const clientPhoneNumberChanged = (clientPhoneNumber: string) => {
  return {
    type: CLIENT_PHONE_NUMBER_CHANGED,
    payload: clientPhoneNumber,
  };
};

export const clientEmailChanged = (clientEmail: string) => {
  return {
    type: CLIENT_EMAIL_CHANGED,
    payload: clientEmail,
  };
};

export const clientNotesChanged = (clientNotes: string) => {
  return {
    type: CLIENT_NOTES_CHANGED,
    payload: clientNotes,
  };
};
