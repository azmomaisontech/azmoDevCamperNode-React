import React, { Fragment, useContext, useEffect, useState } from "react";
import BootcampItem from "./BootcampItem";
import { BootcampContext } from "../../context/bootcamp/BootcampState";
import Spinner from "../layout/Spinner";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import isEmpty from "../../util/isEmpty";
import Pagination from "../layout/Pagination";
import FilterBootcamp from "./FilterBootcamp";
import { FormEventProps } from "../../context/type";

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
    const value: { page?: number } = queryString.parse(location.search);
    if (getBootcamps) getBootcamps(value.page);

    return () => {
      if (clearBootcamps) clearBootcamps();
    };
    //eslint-disable-next-line
  }, [location.search]);

  const handleChange = (e: FormEventProps) => {
    setFilter({ ...filter, [e.currentTarget.name]: e.currentTarget.value });
  };

  //To filter the bootcamps
  const handleSubmit = (e: FormEventProps) => {
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
              <FilterBootcamp handleSubmit={handleSubmit} handleChange={handleChange} rating={rating} budget={budget} />
            )}

            <div className="bootcamps">
              {bootcamps && bootcamps.length === 0 && !loading ? (
                <h3>No Bootcamps</h3>
              ) : bootcamps && bootcamps.length !== 0 && !loading ? (
                bootcamps.map((bootcamp) => <BootcampItem key={bootcamp._id} bootcamp={bootcamp} />)
              ) : (
                <Spinner />
              )}
              {pagination && !isEmpty(pagination) && <Pagination />}
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Bootcamps;
