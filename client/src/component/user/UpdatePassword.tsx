import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth/AuthState";
import { AlertContext } from "../../context/alert/AlertState";
import { FormEventProps } from "../../context/type";

const UpdatePassword = () => {
  const [user, setUser] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { currentPassword, newPassword, confirmPassword } = user;

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { updatePassword, error, clearError, success, clearSuccess } = authContext;
  const { setAlert } = alertContext;

  const handleChange = (e: FormEventProps) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };

  useEffect(
    () => {
      if (error === "Password is incorrect" && setAlert) {
        setAlert("Password is incorrect", "danger");
      } else if (success && setAlert) {
        setAlert("Password changed successfully", "success");
      }

      if (clearError && clearSuccess) {
        clearError();
        clearSuccess();
      }
    },
    //eslint-disable-next-line
    [error, success]
  );

  const handleSubmit = (e: FormEventProps) => {
    e.preventDefault();

    if (newPassword !== confirmPassword && setAlert) return setAlert("Password does not match", "danger");
    if (updatePassword) updatePassword(user);
  };

  return (
    <main id="manage-main">
      <div className="resetform-container">
        <form onSubmit={handleSubmit}>
          <h2 className="m-heading">Update Password</h2>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={currentPassword}
              onChange={handleChange}
              placeholder="Current Password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              placeholder="New Password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
            <p
              style={
                confirmPassword.length > 0 && newPassword !== confirmPassword
                  ? { display: "block", color: "red" }
                  : { display: "none" }
              }
            >
              Password does not match
            </p>
          </div>
          <input type="submit" className="btn btn-dark btn-block" value="Update Password" />
        </form>
      </div>
    </main>
  );
};

export default UpdatePassword;
