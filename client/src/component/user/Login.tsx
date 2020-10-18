import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = props => {
  //Initialize state items with context
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const {
    isAuthenticated,
    loginUser,
    clearError,
    error,
    loading
  } = authContext;

  const { setAlert } = alertContext;

  //State for form control
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  //where to take the user after signing in
  const { from } = props.location.state || { from: { pathname: "/" } };

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push(from);
    }

    if (error === "Invalid credentials") {
      setAlert("Username or Password Incorrect", "danger", 3000);
      clearError();
    }

    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    loginUser(user);
  };

  return (
    <main id="login-main">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="m-heading">
            <i className="fas fa-sign-in-alt"></i> Login
          </h2>
          <p>
            Log in to list your bootcamp or rate, review and favorite bootcamps
          </p>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary btn-block"
            value={loading ? "Loading...." : "Login"}
            disabled={loading}
          />
          <p>
            Forgot password?
            <span>
              {" "}
              <Link to="/resetpassword">Reset Password</Link>
            </span>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
