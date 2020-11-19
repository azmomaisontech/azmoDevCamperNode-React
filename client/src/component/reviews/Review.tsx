import React from "react";
import { User } from "../../context/type";

interface Props {
  review: { _id: string; title: string; ratings: string; text: string; user: Partial<User> };
}

const Review: React.FC<Props> = ({ review }) => {
  const { _id, title, ratings, text, user } = review;
  return (
    <div className="review" key={_id}>
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

export default Review;
