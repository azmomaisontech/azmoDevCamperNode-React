import React, { useReducer } from "react";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";
import setAuthToken from "../../util/setAuthToken";
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
import axios from "axios";

const AuthState = props => {
  const initialState = {
    token: null,
    isAuthenticated: null,
    loading: false,
    error: null,
    user: null,
    success: false
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Methods
  // loadUser
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/v1/auth/me");
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
      clearSuccess();
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.error
      });
    }
  };

  //   Register new user
  const registerUser = async formData => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/v1/auth/register", formData, config);
      dispatch({
        type: REGISTER_USER,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.error
      });
    }
  };

  //LoginUser
  const loginUser = async formData => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/v1/auth/login", formData, config);
      dispatch({
        type: LOGIN_USER,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.error
      });
    }
  };

  //Update user Name / Email
  const updateUser = async formData => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(
        "/api/v1/auth/updatedetails",
        formData,
        config
      );
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: UPDATE_ERROR,
        payload: err.response.data.error
      });
    }
  };

  //Update user password
  const updatePassword = async formData => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(
        "/api/v1/auth/updatepassword",
        formData,
        config
      );
      dispatch({
        type: UPDATE_PASSWORD,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: UPDATE_ERROR,
        payload: err.response.data.error
      });
    }
  };

  //LogOut User
  const logoutUser = () => {
    setLoading();
    dispatch({
      type: LOGOUT_USER,
      payload: null
    });
  };

  //   Clear Error
  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR
    });
  };

  //   Set Loading to true
  const setLoading = () => {
    dispatch({
      type: SET_LOADING
    });
  };

  //Clear Success
  const clearSuccess = () => {
    dispatch({
      type: CLEAR_SUCCESS
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.user,
        success: state.success,
        loadUser,
        registerUser,
        loginUser,
        logoutUser,
        updateUser,
        updatePassword,
        clearError,
        clearSuccess
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
