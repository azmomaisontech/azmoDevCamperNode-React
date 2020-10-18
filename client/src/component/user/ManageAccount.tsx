import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const ManageAccount = () => {
  //Initialize Context
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  //Bring out items from context
  const { updateUser, clearError, error, success, clearSuccess } = authContext;
  const { setAlert } = alertContext;

  //Form controller
  const [userInfo, setUser] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    if (error !== null) {
      setAlert(error, "danger");
    } else if (success) {
      setAlert("User info changed successfully", "success");
    }

    clearError();
    clearSuccess();

    //eslint-disable-next-line
  }, [success, error]);

  const handleChange = e => {
    setUser({ ...userInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    updateUser(userInfo);
  };

  const { name, email } = userInfo;

  return (
    <main id="manage-main">
      <div className="resetform-container">
        <form onSubmit={handleSubmit}>
          <h2 className="m-heading">Manage Account</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter Name"
              required
            />
          </div>
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
            <p className="text-danger">
              *Changing your email will mean you have to login with the new
              email address provided
            </p>
          </div>
          <div className="submit-buttons">
            <input
              type="submit"
              className="btn btn-green btn-medium"
              value="Save"
            />
            <Link to="/update-password" className="btn btn-gray btn-medium">
              Update Password
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ManageAccount;
