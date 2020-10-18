import {
  REGISTER_USER,
  LOGIN_USER,
  CLEAR_ERROR,
  SET_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_USER,
  UPDATE_USER,
  UPDATE_PASSWORD,
  UPDATE_ERROR,
  CLEAR_SUCCESS
} from "../type";

export default (state, action) => {
  switch (action.type) {
    case REGISTER_USER:
    case LOGIN_USER:
    case UPDATE_PASSWORD:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        success: action.payload.success,
        loading: false
      };
    case AUTH_ERROR:
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return {
        ...state,
        error: action.payload,
        token: null,
        isAuthenticated: null,
        loading: false,
        user: null
      };
    case UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case USER_LOADED:
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload.data,
        success: action.payload.success,
        isAuthenticated: true,
        loading: false
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
        loading: false
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        success: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
