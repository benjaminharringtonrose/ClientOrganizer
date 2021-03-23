import { useState, useEffect } from "react";
import { isEqual } from "lodash";
import { mapClients } from "../screens/util";
import { IClient } from "../screens/HomeScreen";
import ClientUpdateScreen from "../screens/ClientUpdateScreen";

export function useClients(props: {
  clients: IClient[];
  fetchUserLoading?: boolean;
  fetchUserError?: string;
}) {
  const [state, setState] = useState({
    clients: [],
  });
  useEffect(() => {
    if (!props.fetchUserLoading && !props.fetchUserError) {
      if (props.clients) {
        const mappedClients = mapClients(props.clients);
        setState({
          ...state,
          ...state.clients,
          clients: mappedClients,
        });
      }
    }
  }, [props.clients, props.fetchUserLoading, props.fetchUserError]);
  return state.clients;
}
