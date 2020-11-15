import { StateEnum } from "../type";

export default (state, action) => {
  switch (action.type) {
    case StateEnum.REGISTER_USER:
    case StateEnum.LOGIN_USER:
    case StateEnum.UPDATE_PASSWORD:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        success: action.payload.success,
        loading: false,
      };
    case StateEnum.AUTH_ERROR:
    case StateEnum.LOGOUT_USER:
      localStorage.removeItem("token");
      return {
        ...state,
        error: action.payload,
        token: null,
        isAuthenticated: null,
        loading: false,
        user: null,
      };
    case StateEnum.UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case StateEnum.USER_LOADED:
    case StateEnum.UPDATE_USER:
      return {
        ...state,
        user: action.payload.data,
        success: action.payload.success,
        isAuthenticated: true,
        loading: false,
      };

    case StateEnum.CLEAR_ERROR:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case StateEnum.CLEAR_SUCCESS:
      return {
        ...state,
        success: false,
      };
    case StateEnum.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
