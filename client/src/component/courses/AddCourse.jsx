import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import BootcampContext from "../../context/bootcamp/bootcampContext";
import AlertContext from "../../context/alert/alertContext";

const AddCourse = props => {
  //initialize bootcamp context and alert context
  const bootcampContext = useContext(BootcampContext);
  const alertContext = useContext(AlertContext);

  const {
    addCourse,
    updateCourse,
    currentCourse,
    clearCurrentCourse,
    clearSuccess,
    clearError,
    error,
    success
  } = bootcampContext;

  const { setAlert } = alertContext;

  //state for form control
  const [course, setCourse] = useState({
    title: "",
    description: "",
    weeks: "",
    scholarhipsAvailable: false,
    tuition: "",
    minimumSkill: ""
  });

  //Destructure items from course state
  const {
    title,
    description,
    weeks,
    scholarhipsAvailable,
    tuition,
    minimumSkill
  } = course;

  //for page control. To check if we are adding or updating courses.
  //When component mount, check if current course has items in it, and then populate the form
  useEffect(() => {
    if (currentCourse !== null) {
      setCourse(currentCourse);
    } else {
      setCourse({
        title: "",
        description: "",
        weeks: "",
        scholarhipsAvailable: false,
        tuition: "",
        minimumSkill: ""
      });
    }

    if (error !== null) {
      setAlert(error, "danger");
    } else if (currentCourse !== null && success) {
      setAlert("Course Updated Successfully", "success");
      props.history.goBack();
    } else if (currentCourse === null && success) {
      setAlert("Course Added Successfully", "success");
      props.history.goBack();
    }

    clearSuccess();
    clearError();

    return () => {
      clearCurrentCourse();
    };

    //eslint-disable-next-line
  }, [currentCourse, success, error, props.history]);

  //for adding new course, form control
  const handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setCourse({ ...course, [name]: value });
  };

  // To submit form for both new and updated course
  const handleSubmit = e => {
    e.preventDefault();

    if (currentCourse === null) {
      addCourse(course, props.match.params.id);
    } else {
      updateCourse(course, props.match.params.id);
    }
  };

  return (
    <main id="add-courses">
      <div className="review-container">
        <div className="add-course">
          <div className="back-link">
            <Link to="/bootcamps/:id/manage-course">
              <i className="fas fa-chevron-left"></i>
              Manage Courses
            </Link>
          </div>

          <h2 className="m-heading">DevWorks Bootcamp</h2>
          <h2 className="s-heading text-primary">Add Course</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Course Title</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="Title"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="weeks">Duration</label>
              <input
                type="text"
                name="weeks"
                value={weeks}
                onChange={handleChange}
                placeholder="Duration(weeks) e.g 1 to 52"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="tuition">Course Tuition</label>
              <input
                type="text"
                name="tuition"
                value={tuition}
                onChange={handleChange}
                placeholder="Tuition"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="minimumSkill">Minimum Skill Required</label>
              <select
                name="minimumSkill"
                value={minimumSkill}
                onChange={handleChange}
                required
              >
                <option> Choose a level</option>
                <option value="beginner">Beginner </option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                cols="30"
                rows="10"
                value={description}
                onChange={handleChange}
                placeholder="Course Description Summary"
                required
              ></textarea>
              <p>No more than 500 characters</p>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                name="scholarhipsAvailable"
                checked={scholarhipsAvailable}
                onChange={handleChange}
              />{" "}
              Scholarship Available
            </div>
            <input
              className="btn btn-block btn-dark"
              type="submit"
              value={currentCourse === null ? "Add Course " : "Update Course"}
            />
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddCourse;
