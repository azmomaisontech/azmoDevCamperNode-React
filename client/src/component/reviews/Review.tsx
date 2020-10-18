import React from "react";
import PropTypes from "prop-types";

const Review = ({ review }) => {
  const { title, ratings, text, user } = review;
  return (
    <div className="review" key={review._id}>
      <div className="review-heading">
        <h2 className="s-heading">{title}</h2>
      </div>
      <div className="review-body">
        <h2 className="s-heading">
          Rating: <span className="text-green">{ratings}</span>
        </h2>
        <p>{text}</p>
        <p className="text-gray">Written By {user.name}</p>
      </div>
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.object.isRequired
};

export default Review;
