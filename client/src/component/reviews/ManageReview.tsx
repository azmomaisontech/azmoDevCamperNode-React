import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { BootcampContext } from "../../context/bootcamp/BootcampState";
import { AlertContext } from "../../context/alert/AlertState";
import { AuthContext } from "../../context/auth/AuthState";
import Spinner from "../layout/Spinner";

const ManageReview = () => {
  //initialize use context
  const bootcampContext = useContext(BootcampContext);
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  //Pull out items from both context
  const { setAlert } = alertContext;
  const {
    reviews,
    clearReviews,
    error,
    clearError,
    deleteReviews,
    addCurrentReview,
    loading,
    getReviews,
  } = bootcampContext;
  const { user } = authContext;

  useEffect(() => {
    if (getReviews) getReviews();

    return () => {
      if (clearReviews) clearReviews();
    };

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error && setAlert) {
      setAlert(error, "danger");
    }

    if (clearError) clearError();

    //eslint-disable-next-line
  }, [error]);

  //To get the review that belongs to a particular logged in user
  const userReview = reviews?.filter((review) => review.user === user?._id);

  if (userReview?.length === 0 && !loading)
    return (
      <main id="manage-review">
        <div className="review-container">
          <div className="review-table">
            <h2 className="m-heading">No Reviews</h2>
          </div>
        </div>
      </main>
    );
  if (loading) return <Spinner />;

  return (
    <main id="manage-review">
      <div className="review-container">
        <div className="review-table">
          <h2 className="m-heading">Manage Reviews</h2>
          {userReview && userReview.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Bootcamp</th>
                  <th>Rating</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userReview.length > 0 &&
                  userReview.map((review) => (
                    <tr key={review._id}>
                      <td>{review.bootcamp.name} </td>
                      <td>{review.ratings}</td>
                      <td>
                        {addCurrentReview && (
                          <Link
                            className="btn btn-sm btn-gray"
                            onClick={() => addCurrentReview(review)}
                            to={`/bootcamps/${review.bootcamp._id}/edit-review/${review._id}`}
                          >
                            <i className="fas fa-pen"></i>
                          </Link>
                        )}
                        {deleteReviews && (
                          <button onClick={() => deleteReviews(review._id)} className="btn btn-sm btn-danger">
                            <i className="fas fa-times"></i>
                          </button>
                        )}
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

export default ManageReview;
