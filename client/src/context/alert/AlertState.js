import React, { useReducer } from "react";
import AlertReducer from "./alertReducer";
import AlertContext from "./alertContext";
import { SET_ALERT, CLEAR_ALERT } from "../type";
import uuid from "uuid";

const AlertState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (msg, type, timeout = 2000) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: {
        msg,
        type,
        id
      }
    });

    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
        payload: id
      });
    }, timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
