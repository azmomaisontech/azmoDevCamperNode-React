import React, { useContext, useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import { BootcampContext } from "../../context/bootcamp/BootcampState";
import Review from "./Review";
import Spinner from "../layout/Spinner";

const ReadReviews = () => {
  const params = useParams<{ id: string }>();
  const bootcampContext = useContext(BootcampContext);
  const {
    loading,
    bootcamp,
    clearBootcamp,
    bootcampReviews,
    getBootcampReviews,
    clearBootcampReviews,
  } = bootcampContext;

  useEffect(() => {
    if (getBootcampReviews) getBootcampReviews(params.id);

    return () => {
      if (clearBootcampReviews && clearBootcamp) {
        clearBootcampReviews();
        clearBootcamp();
      }
    };

    //eslint-disable-next-line
  }, [params.id]);

  if (bootcamp === null) return <Redirect to="/bootcamps" />;
  if (loading) return <Spinner />;

  return (
    <main id="read-reviews">
      <div className="container">
        <div className="review-grid">
          <div className="review-content">
            <Link className="btn btn-gray btn-sm " to={`/bootcamps/${bootcamp?._id}`}>
              <i className="fas fa-chevron-left margin-right"></i>
              Bootcamp Info
            </Link>
            <h2 className="m-heading">{bootcamp?.name}</h2>

            {bootcampReviews &&
              bootcampReviews.length > 0 &&
              bootcampReviews.map((review) => <Review review={review!} key={review?._id} />)}
          </div>
          <div className="review-image">
            <div className="rating">
              <span className="badge badge-round badge-green">{bootcamp?.averageRating}</span>
              <h2 className="m-heading">Rating</h2>
            </div>
            <Link className="btn btn-primary btn-block" to={`/bootcamps/${bootcamp?._id}/add-review`}>
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
