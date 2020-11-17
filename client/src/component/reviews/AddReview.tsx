import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { BootcampContext } from "../../context/bootcamp/BootcampState";
import { AlertContext } from "../../context/alert/AlertState";
import isEmpty from "../../util/isEmpty";
import { Review, FormEventProps } from "../../context/type";

const AddReview = () => {
  const history = useHistory();
  const params = useParams<{
    reviewId: string;
    bootcampId: string;
  }>();
  //initialize bootcamp and alert context
  const bootcampContext = useContext(BootcampContext);
  const alertContext = useContext(AlertContext);

  // extract methods and state info from both context
  const { setAlert } = alertContext;
  const {
    getBootcamp,
    bootcamp,
    addReview,
    updateReview,
    currentReview,
    clearCurrentReview,
    success,
    clearSuccess,
    clearError,
    error,
    loading,
  } = bootcampContext;

  //Local state for form control
  const [review, setReview] = useState<Partial<Review>>({
    title: "",
    text: "",
    ratings: "",
  });

  //Dynamically change the form to an edit form if a user
  //clicks the edit button or an add form if the user clicks an add review button
  useEffect(() => {
    if (!isEmpty(currentReview) && currentReview) {
      setReview(currentReview);
    } else {
      setReview({
        title: "",
        text: "",
        ratings: "",
      });
    }

    if (error) {
      if (error === "User Already Exist" && setAlert) {
        setAlert("You already reviewed this bootcamp", "danger");
      } else {
        if (setAlert) setAlert(error, "danger", 4000);
      }
    }

    if (success && !isEmpty(currentReview) && setAlert) {
      setAlert("Review updated successfully", "success");
      history.goBack();
    } else if (success && isEmpty(currentReview) && setAlert && getBootcamp) {
      setAlert("Review Added successfully", "success");
      if (bootcamp?._id) getBootcamp(bootcamp._id);
      history.goBack();
    }
    if (clearError && clearSuccess) {
      clearError();
      clearSuccess();
    }

    return () => {
      if (clearCurrentReview) clearCurrentReview();
    };

    //eslint-disable-next-line
  }, [error, currentReview, success, history]);

  const handleChange = (e: FormEventProps) => {
    setReview({ ...review, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = (e: FormEventProps) => {
    e.preventDefault();
    if (!isEmpty(currentReview) && updateReview && review) {
      updateReview(review, params.reviewId);
    } else if (addReview && review) {
      addReview(review, params.bootcampId);
    }
  };

  const { title, text, ratings } = review;

  return (
    <main id="add-review">
      <div className="review-container">
        <div className="new-review">
          <Link to={`/bootcamps/${params.bootcampId}`}>
            <i className="fas fa-chevron-left"></i>
            Bootcamp Info
          </Link>

          <h2 className="s-heading text-primary">Write A Review</h2>
          <p>You must have attended and completed this bootcamp to write a review </p>
          <form onSubmit={handleSubmit}>
            <select value={ratings} onChange={handleChange} name="ratings">
              <option>Rating</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <input type="text" value={title} onChange={handleChange} placeholder="Review Title" name="title" />
            <textarea
              name="text"
              value={text}
              onChange={handleChange}
              cols={30}
              rows={15}
              placeholder="Your review"
            ></textarea>
            <input type="submit" value={loading ? "Loading...." : "Submit Review"} className="btn btn-dark btn-block" />
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddReview;
