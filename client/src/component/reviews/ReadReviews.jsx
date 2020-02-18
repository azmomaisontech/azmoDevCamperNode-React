import React, { useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import BootcampContext from "../../context/bootcamp/bootcampContext";
import Review from "./Review";
import Spinner from "../layout/Spinner";

const ReadReviews = props => {
  const bootcampContext = useContext(BootcampContext);
  const {
    loading,
    bootcamp,
    clearBootcamp,
    bootcampReviews,
    getBootcampReviews,
    clearBootcampReviews
  } = bootcampContext;

  useEffect(() => {
    getBootcampReviews(props.match.params.id);

    return () => {
      clearBootcampReviews();
      clearBootcamp();
    };

    //eslint-disable-next-line
  }, [props.match.params.id]);

  if (bootcamp === null) return <Redirect to="/bootcamps" />;
  if (loading) return <Spinner />;

  const { _id, name, averageRating } = bootcamp;

  return (
    <main id="bootcamp-display">
      <div className="container">
        <div className="bootcamp-grid">
          <div className="bootcamp-content">
            <Link className="btn btn-gray btn-sm " to={`/bootcamps/${_id}`}>
              <i className="fas fa-chevron-left"></i>
              Bootcamp Info
            </Link>
            <h2 className="m-heading">{name}</h2>

            {bootcampReviews !== null &&
              bootcampReviews.map(review => (
                <Review review={review} key={review._id} />
              ))}
          </div>
          <div className="bootcamp-image">
            <div className="rating">
              <span className="badge badge-round badge-green">
                {averageRating}
              </span>
              <h2 className="m-heading">Rating</h2>
            </div>
            <Link
              className="btn btn-primary btn-block"
              to={`/bootcamps/${_id}/add-review`}
            >
              <i className="fas fa-pen"></i>
              Review This Bootcamp
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReadReviews;
