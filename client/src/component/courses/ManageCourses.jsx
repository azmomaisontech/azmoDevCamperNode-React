import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import BootcampItem from "../bootcamp/BootcampItem";
import BootcampContext from "../../context/bootcamp/bootcampContext";
import AlertContext from "../../context/alert/alertContext";

const ManageCourses = () => {
  const bootcampContext = useContext(BootcampContext);
  const alertContext = useContext(AlertContext);

  const {
    currentBootcamp,
    addCurrentCourse,
    courses,
    error,
    clearError,
    deleteCourse
  } = bootcampContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (error !== null) {
      setAlert(error, "danger");
    }
    clearError();

    //eslint-disable-next-line
  }, [error]);

  return (
    <main id="manage-courses">
      <div className="review-container">
        <div className="manage-course">
          <div className="back-link">
            <Link to="/manage-bootcamp">
              <i className="fas fa-chevron-left"></i>
              Manage Bootcamp
            </Link>
          </div>

          <h2 className="m-heading">Manage Courses</h2>
          <BootcampItem bootcamp={currentBootcamp} />

          <Link
            className="btn btn-block btn-primary"
            to={`/bootcamps/${currentBootcamp._id}/add-course`}
          >
            Add Bootcamp Courses
          </Link>
          {courses && courses.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course._id}>
                    <td>{course.title}</td>
                    <td>
                      <Link
                        onClick={() => addCurrentCourse(course)}
                        className="btn btn-sm btn-gray"
                        to={`edit-course/${course._id}`}
                      >
                        <i className="fas fa-pen"></i>
                      </Link>
                      <button
                        onClick={() => deleteCourse(course._id)}
                        className="btn btn-sm btn-danger"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
};

export default ManageCourses;
