import React, { Fragment, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthState";
import { BootcampContext } from "../../context/bootcamp/BootcampState";

const DesktopNavBar = withRouter((props) => {
  const authContext = useContext(AuthContext);
  const bootcampContext = useContext(BootcampContext);

  const { isAuthenticated, logoutUser } = authContext;
  const { getBootcamps, clearBootcamps } = bootcampContext;

  //Logout
  const handleLogout = () => {
    if (logoutUser && clearBootcamps) {
      logoutUser();
      clearBootcamps();
    }
    props.history.push("/");
  };

  return (
    <nav id="navbar">
      <div className="container">
        <div className="logo">
          <h1>
            <Link to="/">
              <i className="fas fa-laptop-code"></i> Azmo DevCamper
            </Link>
          </h1>
        </div>
        <div className="accounts">
          <ul>
            {!isAuthenticated && (
              <Fragment>
                <li>
                  <Link to="/login">
                    <i className="fas fa-sign-in-alt"></i> Login
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <i className="fas fa-user-plus"></i> Register
                  </Link>
                </li>
              </Fragment>
            )}
            {isAuthenticated && getBootcamps && (
              <li className="dropdown-menu">
                <span className="account-icon">
                  <i className="fas fa-user"></i> Account
                </span>
                <div className="nav-list">
                  <ul>
                    <li>
                      <Link onClick={() => getBootcamps(1, 1000)} to="/manage-bootcamp">
                        Manage Bootcamp
                      </Link>
                    </li>
                    <li>
                      <Link to="/manage-review">Manage Review</Link>
                    </li>
                    <li>
                      <Link to="/manage-account">Manage Account</Link>
                    </li>
                    <li>
                      <button className="logout" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            )}
            <div className="divide-line"></div>
            <li>
              {getBootcamps && (
                <Link onClick={() => getBootcamps()} to="/bootcamps">
                  Browse All Bootcamps
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
});

export default DesktopNavBar;
