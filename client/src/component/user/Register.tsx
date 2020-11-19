import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthState";
import { AlertContext } from "../../context/alert/AlertState";
import { FormEventProps } from "../../context/type";

const Register = () => {
  const location = useLocation<any>();
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "user",
  });

  const { name, email, password, password2 } = user;

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { loading, error, clearError, registerUser, isAuthenticated } = authContext;
  const { setAlert } = alertContext;

  //where to take the user after signing in
  const { from } = location.state || { from: { pathname: "/" } };

  useEffect(
    () => {
      if (isAuthenticated) {
        history.push(from);
      }
      if (error === "User Already Exist" && setAlert && clearError) {
        setAlert("User already exist", "danger", 3000);
        clearError();
      }
    },
    //eslint-disable-next-line
    [error, isAuthenticated, history]
  );

  const handleChange = (e: FormEventProps) => {
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = (e: FormEventProps) => {
    e.preventDefault();
    if (password !== password2 && setAlert) return setAlert("Passwords does not match", "danger");
    if (registerUser) registerUser(user);
  };

  return (
    <main id="login-main">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="m-heading">
            <i className="fas fa-user-plus"></i> Register
          </h2>
          <p>Register to list your bootcamp or rate, review and favorite bootcamps</p>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter Full name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" value={email} onChange={handleChange} placeholder="Enter Email" required />
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
              minLength={6}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              minLength={6}
            />
            <p
              style={
                password2.length > 0 && password !== password2
                  ? { display: "block", color: "red" }
                  : { display: "none" }
              }
            >
              Password does not match
            </p>
          </div>
          <div className="form-group role">
            <h2 className="s-heading">User Role</h2>
            <div>
              <input type="radio" name="role" value="user" /* checked={role.user} */ onChange={handleChange} required />
              <span> Regular User (Browse, Write reviews, etc) </span>
            </div>

            <div>
              <input
                type="radio"
                name="role"
                value="publisher"
                /* checked={role.publisher} */
                onChange={handleChange}
                required
              />
              <span> Bootcamp Publisher</span>
            </div>
          </div>
          <input
            type="submit"
            className="btn btn-primary btn-block"
            value={loading ? "Loading...." : "Register"}
            disabled={loading}
          />
          <p>
            Already Registered?
            <span>
              {" "}
              <Link to="/login">Login</Link>
            </span>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
