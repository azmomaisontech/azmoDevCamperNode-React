import React, { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { BootcampContext } from "../../context/bootcamp/BootcampState";
import Spinner from "../layout/Spinner";
import Course from "../courses/Course";
import isEmpty from "../../util/isEmpty";

const BootcampDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const bootcampContext = useContext(BootcampContext);
  const {
    getBootcamp,
    bootcamp,
    loading,
    bootcampReviews,
    getBootcampReviews,
    clearBootcampReviews,
    clearReviews,
  } = bootcampContext;

  useEffect(() => {
    if (getBootcamp) getBootcamp(id);
    if (getBootcampReviews) getBootcampReviews(id);
    return () => {
      if (clearReviews) clearReviews();
      if (clearBootcampReviews) clearBootcampReviews();
    };

    //eslint-disable-next-line
  }, []);

  return (
    <main id="bootcamp-display">
      <div className="container">
        {bootcamp && !isEmpty(bootcamp) && !loading ? (
          <div className="bootcamp-grid">
            <div className="bootcamp-content">
              <h2 className="m-heading">{bootcamp.name}</h2>
              <p>{bootcamp.description}</p>
              {bootcamp.averageCost && (
                <h2 className="s-heading">
                  Average Course Cost: <span className="text-primary"> {bootcamp.averageCost}</span>
                </h2>
              )}

              {bootcamp.courses && bootcamp.courses.map((course) => <Course key={course._id} course={course} />)}
            </div>
            <div className="bootcamp-image">
              <div className="image">
                <img src={`/uploads/${bootcamp.photo}`} alt="Bootcamp Profile" />
              </div>
              <div className="rating">
                <span className="badge badge-round badge-primary">{bootcamp.averageRating}</span>
                <h2 className="m-heading">Rating</h2>
              </div>
              {bootcampReviews && bootcampReviews.length > 0 && (
                <Link className="btn btn-dark btn-block" to={`/bootcamps/${bootcamp._id}/reviews`}>
                  <i className="fas fa-comments"></i>
                  Read Reviews
                </Link>
              )}
              <Link className="btn btn-light btn-block" to={`/bootcamps/${bootcamp._id}/add-review`}>
                <i className="fas fa-pen"></i>
                Write a Review
              </Link>
              <a className="btn btn-gray btn-block" href={bootcamp.website} rel="noopener noreferrer" target="_blank">
                <i className="fas fa-globe"></i>
                Vist Website
              </a>
              <div className="bootcamp-info">
                <ul>
                  <li>
                    {bootcamp.housing ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}{" "}
                    <span>Housing</span>
                  </li>
                  <li>
                    {bootcamp.jobAssistance ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}{" "}
                    <span> Job Assistance</span>
                  </li>
                  <li>
                    {bootcamp.jobGuarantee ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}{" "}
                    <span> Job Guarantee</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </main>
  );
};

export default BootcampDetails;
