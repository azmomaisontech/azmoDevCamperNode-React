import React, { useState, useContext, useEffect } from "react";
import { BootcampContext } from "../../context/bootcamp/BootcampState";
import { AlertContext } from "../../context/alert/AlertState";
import { Bootcamp } from "../../context/type";

interface Props {
  bootcamp: Partial<Bootcamp>;
}

const FileUpload: React.FC<Props> = ({ bootcamp }) => {
  //Use State method for file upload
  const [file, setFile] = useState<{} | null>({});

  //initialize context
  const bootcampContext = useContext(BootcampContext);
  const alertContext = useContext(AlertContext);

  //destructure items from the bootcamp context state
  const { loading, uploadImage, image, error, clearError, success, clearSuccess, getBootcamps } = bootcampContext;

  //destructure items from the alert context state
  const { setAlert } = alertContext;

  //When component update
  useEffect(() => {
    if (error !== null) {
      if (setAlert && error) setAlert(error, "danger");
    } else if (success) {
      if (setAlert) setAlert("Upload Successful", "success");
      if (getBootcamps) getBootcamps(1, 1000);
    }

    if (clearSuccess) clearSuccess();
    if (clearError) clearError();

    //eslint-disable-next-line
  }, [error, image, success]);

  //When the form is submitted
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (uploadImage && bootcamp._id) uploadImage(file, bootcamp._id);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files);
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

export default FileUpload;
