import React, { Fragment, useContext, useEffect, useState } from "react";
import BootcampItem from "./BootcampItem";
import { BootcampContext } from "../../context/bootcamp/BootcampState";
import Spinner from "../layout/Spinner";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

const Bootcamps: React.FC = () => {
  const location = useLocation();
  const [filter, setFilter] = useState({
    budget: 100000,
    rating: 1,
  });

  //To initialize context
  const bootcampContext = useContext(BootcampContext);
  const { bootcamps, selectBootcamp, clearBootcamps, getBootcamps, pagination, loading } = bootcampContext;

  //Using query string to get the value of the query parament passed when the user clicks the next page
  useEffect(() => {
    //Handle pagination
    const value: { page?: string } = queryString.parse(location.search);
    if (getBootcamps) getBootcamps(value.page);

    return () => {
      if (clearBootcamps) clearBootcamps();
    };
    //eslint-disable-next-line
  }, [location.search]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  //To filter the bootcamps
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectBootcamp) selectBootcamp(rating, budget);
  };

  const { budget, rating } = filter;
  return (
    <Fragment>
      <main id="bootcamp-main">
        <div className="container">
          <div className="grid-container">
            {getBootcamps && (
              <div className="filter">
                <form onSubmit={handleSubmit} className="rating">
                  <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <select name="rating" onChange={handleChange} value={rating}>
                      <option value="1">Any</option>
                      <option value="9">9+</option>
                      <option value="8">8+</option>
                      <option value="7">7+</option>
                      <option value="6">6+</option>
                      <option value="5">5+</option>
                      <option value="4">4+</option>
                      <option value="3">3+</option>
                      <option value="2">2+</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="budget">Budget</label>
                    <select name="budget" onChange={handleChange} value={budget}>
                      <option value="100000">Any</option>
                      <option value="20000">$20000</option>
                      <option value="15000">$15000</option>
                      <option value="10000">$10000</option>
                      <option value="8000">$8000</option>
                      <option value="6000">$6000 </option>
                      <option value="4000">$4000</option>
                      <option value="2000">$2000</option>
                    </select>
                  </div>
                  <input
                    type="submit"
                    className="btn
                btn-primary
                btn-block"
                    value="Filter Bootcamps"
                  />
                </form>
                <Link className="btn btn-block btn-green standalone" onClick={() => getBootcamps()} to="/bootcamps">
                  Browse All Bootcamps
                </Link>
              </div>
            )}

            <div className="bootcamps">
              {bootcamps && bootcamps.length === 0 && !loading ? (
                <h3>No Bootcamps</h3>
              ) : bootcamps && bootcamps.length !== 0 && !loading ? (
                bootcamps.map((bootcamp) => <BootcampItem key={bootcamp._id} bootcamp={bootcamp} />)
              ) : (
                <Spinner />
              )}
              {pagination && Object.keys(pagination).length !== 0 && pagination.constructor === Object && (
                <div>
                  <ul className="pagination">
                    <ul>
                      {pagination.prev && (
                        <li>
                          <Link className="btn btn-block btn-primary" to={`/bootcamps?page=${pagination.prev.page}`}>
                            Previous
                          </Link>
                        </li>
                      )}
                      {pagination.next && (
                        <li>
                          <Link className="btn btn-block btn-primary" to={`/bootcamps?page=${pagination.next.page}`}>
                            Next
                          </Link>
                        </li>
                      )}
                    </ul>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Bootcamps;
