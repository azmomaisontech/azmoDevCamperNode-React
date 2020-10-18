import React from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <main id="login-main">
      <div className="resetform-container">
        <form>
          <p>
            <Link to="/login">Back to login </Link>
          </p>
          <h2 className="m-heading">Reset Password</h2>
          <p>
            Please enter your registered email-address to reset your password.
          </p>
          <div className="form-group">
            <label htmlFor="email">Enter Email</label>
            <input
              type="email"
              name="email"
              placeholder=" Email Address"
              required
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary btn-block"
            value="Reset Password"
          />
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
