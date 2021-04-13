import { IStringMap } from "../screens/RegisterScreen";
import { useState, useEffect } from "react";

export const useMessages = (messagesProp?: IStringMap<any>) => {
  const [mappedMessages, setMappedMessages] = useState(undefined);
  useEffect(() => {
    const messages: any = [];
    if (messagesProp) {
      for (const [key, thread] of Object.entries(messagesProp)) {
        for (const [key, message] of Object.entries(thread.messages)) {
          messages.push(message);
        }
      }
    }
    setMappedMessages(messages);
  }, [messagesProp]);
  return mappedMessages;
};
