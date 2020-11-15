import React, { useReducer, createContext } from "react";
import AlertReducer from "./alertReducer";
import { StateEnum, Props, AlertContextProps } from "../type";
import uuid from "uuid";

const initialState = {
  alerts: [],
};

const AlertContext = createContext<Partial<AlertContextProps>>({});

const AlertState: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (msg: string, type: string, timeout = 2000) => {
    const id = uuid.v4();
    dispatch({
      type: StateEnum.SET_ALERT,
      payload: {
        msg,
        type,
        id,
      },
    });

    setTimeout(() => {
      dispatch({
        type: StateEnum.CLEAR_ALERT,
        payload: id,
      });
    }, timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state.alerts,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export { AlertState, AlertContext };
