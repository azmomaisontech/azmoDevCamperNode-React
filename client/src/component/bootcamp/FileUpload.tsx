import React, { useState, useContext, useEffect } from "react";
import BootcampContext from "../../context/bootcamp/bootcampContext";
import AlertContext from "../../context/alert/alertContext";
import PropTypes from "prop-types";

const FileUpload = ({ bootcamp }) => {
  //Use State method for file upload
  const [file, setFile] = useState(null);

  //initialize context
  const bootcampContext = useContext(BootcampContext);
  const alertContext = useContext(AlertContext);

  //destructure items from the bootcamp context state
  const {
    loading,
    uploadImage,
    image,
    error,
    clearError,
    success,
    clearSuccess,
    getBootcamps
  } = bootcampContext;

  //destructure items from the alert context state
  const { setAlert } = alertContext;

  //When component update
  useEffect(() => {
    if (error !== null) {
      setAlert(error, "danger");
    } else if (success) {
      setAlert("Upload Successful", "success");
      getBootcamps(1, 1000);
    }

    clearSuccess();
    clearError();

    //eslint-disable-next-line
  }, [error, image, success]);

  //When the form is submitted
  const handleSubmit = e => {
    e.preventDefault();
    uploadImage(file, bootcamp._id);
    e.target.value = "";
  };

  const handleChange = e => {
    setFile(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type="file" name="file" required />
      <input
        type="submit"
        className="btn btn-light btn-block"
        value={loading ? "Loading...." : "Upload Profile Image"}
        disabled={loading}
      />
    </form>
  );
};

FileUpload.propTypes = {
  bootcamp: PropTypes.object.isRequired
};

export default FileUpload;
