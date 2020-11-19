import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthState";
import { AlertContext } from "../../context/alert/AlertState";
import { FormEventProps } from "../../context/type";

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
    email: "",
  });

  useEffect(() => {
    if (error && setAlert) {
      setAlert(error, "danger");
    } else if (success && setAlert) {
      setAlert("User info changed successfully", "success");
    }

    if (clearError && clearSuccess) {
      clearError();
      clearSuccess();
    }

    //eslint-disable-next-line
  }, [success, error]);

  const handleChange = (e: FormEventProps) => {
    setUser({ ...userInfo, [e.currentTarget.name]: e.currentTarget.value });
  };
  const handleSubmit = (e: FormEventProps) => {
    e.preventDefault();
    if (updateUser) updateUser(userInfo);
  };

  const { name, email } = userInfo;

  return (
    <main id="manage-main">
      <div className="resetform-container">
        <form onSubmit={handleSubmit}>
          <h2 className="m-heading">Manage Account</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={name} onChange={handleChange} placeholder="Enter Name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" value={email} onChange={handleChange} placeholder="Enter Email" required />
            <p className="text-danger">
              *Changing your email will mean you have to login with the new email address provided
            </p>
          </div>
          <div className="submit-buttons">
            <input type="submit" className="btn btn-green btn-medium" value="Save" />
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
