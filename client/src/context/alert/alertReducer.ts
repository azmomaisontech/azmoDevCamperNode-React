import { StateEnum, Alert } from "../type";

export default (state: any, action: any) => {
  switch (action.type) {
    case StateEnum.SET_ALERT:
      return {
        alert: [...state.alert, action.payload],
      };

    case StateEnum.CLEAR_ALERT:
      return state.alert.filter((alert: Alert) => alert.id !== action.payload);

    default:
      return state;
  }
};
