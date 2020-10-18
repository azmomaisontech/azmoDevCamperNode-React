import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import BootcampContext from "../../context/bootcamp/bootcampContext";
import BootcampItem from "./BootcampItem";
import FileUpload from "./FileUpload";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import Spinner from "../layout/Spinner";

const ManageBootcamp = props => {
  //Initialize Context
  const bootcampContext = useContext(BootcampContext);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const {
    getBootcamps,
    error,
    clearError,
    bootcamps,
    setCurrent,
    deleteBootcamp,
    loading
  } = bootcampContext;

  const { user } = authContext;

  const { setAlert } = alertContext;

  useEffect(() => {
    getBootcamps(1, 100);

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error !== null) {
      setAlert(error, "danger");
    }

    clearError();

    //eslint-disable-next-line
  }, [bootcamps, error]);

  const handleDelete = id => {
    deleteBootcamp(id);
    props.history.push("/");
  };

  const userBootcamp = bootcamps.filter(bootcamp => bootcamp.user === user._id);

  if (loading && userBootcamp.length === 0) return <Spinner />;

  //To check if this present user has any bootcamp in the state
  if (userBootcamp.length === 0)
    return (
      <main id="manage-bootcamp">
        <div className="review-container">
          <div className="bootcamps">
            <h2 className="m-heading">Add Bootcamp</h2>
            <div className="buttons">
              <Link className="btn btn-block btn-primary" to="/add-bootcamp">
                Add Bootcamp Details
              </Link>
            </div>
            <p className="text-gray">
              * You can only add one bootcamp per account.
            </p>
            <p className="text-gray">
              * You must be affiliated with the bootcamp in some way in order to
              add it to DevCamper.
            </p>
          </div>
        </div>
      </main>
    );

  //If user has an associated bootcamp
  return userBootcamp.map(bootcamp => (
    <main id="manage-bootcamp" key={bootcamp._id}>
      <div className="review-container">
        <div className="bootcamps">
          <h2 className="m-heading">Manage Bootcamp</h2>

          <BootcampItem bootcamp={bootcamp} />
          <FileUpload bootcamp={bootcamp} />

          <div className="buttons">
            <Link
              onClick={() => setCurrent(bootcamp)}
              className="btn btn-block btn-primary"
              to="/add-bootcamp"
            >
              Edit Bootcamp Details
            </Link>
            <Link
              onClick={() => setCurrent(bootcamp)}
              className="btn btn-block btn-gray"
              to={`/bootcamps/${bootcamp._id}/manage-course`}
            >
              Manage Courses
            </Link>
            <button
              onClick={() => handleDelete(bootcamp._id)}
              className="btn btn-block btn-danger"
            >
              Remove Bootcamp
            </button>
          </div>
          <p className="text-gray">
            * You can only add one bootcamp per account.
          </p>
          <p className="text-gray">
            * You must be affiliated with the bootcamp in some way in order to
            add it to DevCamper.
          </p>
        </div>
      </div>
    </main>
  ));
};

export default ManageBootcamp;
