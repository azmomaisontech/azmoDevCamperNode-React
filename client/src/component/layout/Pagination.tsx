import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BootcampContext } from "../../context/bootcamp/BootcampState";

const Pagination: React.FC = () => {
  const bootcampContext = useContext(BootcampContext);
  const { pagination } = bootcampContext;
  return (
    <div>
      <ul className="pagination">
        <ul>
          {pagination?.prev && (
            <li>
              <Link className="btn btn-block btn-primary" to={`/bootcamps?page=${pagination.prev.page}`}>
                Previous
              </Link>
            </li>
          )}
          {pagination?.next && (
            <li>
              <Link className="btn btn-block btn-primary" to={`/bootcamps?page=${pagination.next.page}`}>
                Next
              </Link>
            </li>
          )}
        </ul>
      </ul>
    </div>
  );
};

export default Pagination;
