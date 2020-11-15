import React, { useReducer, createContext } from "react";
import AuthReducer from "./authReducer";
import setAuthToken from "../../util/setAuthToken";
import { StateEnum, AuthContextProps, Props } from "../type";
import axios from "axios";

const AuthContext = createContext<Partial<AuthContextProps>>({});

const AuthState: React.FC<Props> = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    loading: false,
    error: "",
    user: {},
    success: false,
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
        type: StateEnum.USER_LOADED,
        payload: res.data,
      });
      clearSuccess();
    } catch (err) {
      dispatch({
        type: StateEnum.AUTH_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  //   Register new user
  const registerUser = async (formData: any) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/v1/auth/register", formData, config);
      dispatch({
        type: StateEnum.REGISTER_USER,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: StateEnum.AUTH_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  //LoginUser
  const loginUser = async (formData: any) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/v1/auth/login", formData, config);
      dispatch({
        type: StateEnum.LOGIN_USER,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: StateEnum.AUTH_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  //Update user Name / Email
  const updateUser = async (formData: any) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put("/api/v1/auth/updatedetails", formData, config);
      dispatch({
        type: StateEnum.UPDATE_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: StateEnum.UPDATE_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  //Update user password
  const updatePassword = async (formData: any) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put("/api/v1/auth/updatepassword", formData, config);
      dispatch({
        type: StateEnum.UPDATE_PASSWORD,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: StateEnum.UPDATE_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  //LogOut User
  const logoutUser = () => {
    setLoading();
    dispatch({
      type: StateEnum.LOGOUT_USER,
      payload: null,
    });
  };

  //   Clear Error
  const clearError = () => {
    dispatch({
      type: StateEnum.CLEAR_ERROR,
    });
  };

  //   Set Loading to true
  const setLoading = () => {
    dispatch({
      type: StateEnum.SET_LOADING,
    });
  };

  //Clear Success
  const clearSuccess = () => {
    dispatch({
      type: StateEnum.CLEAR_SUCCESS,
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
        clearSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthState, AuthContext };
