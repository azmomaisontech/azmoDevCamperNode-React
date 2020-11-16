import React from "react";
import { Link } from "react-router-dom";
import { Bootcamp } from "../../context/type";

interface Props {
  bootcamp: Partial<Bootcamp>;
}

const BootcampItem: React.FC<Props> = ({ bootcamp }) => {
  const { _id, name, location, careers, averageRating, photo } = bootcamp;
  return (
    <div className="bootcamp">
      <div className="bootcamp-image">
        <img src={`/uploads/${photo}`} alt="Bootcamp Profile" />
      </div>
      <div className="bootcamp-content">
        <div className="float-left">
          <h2 className="s-heading text-primary">
            <Link to={`/bootcamps/${_id}`} className="text-primary">
              {name}
            </Link>
          </h2>
          <span className="badge badge-dark">
            {location && location.city}, {location && location.state}
          </span>
          <p>{careers && careers.toString()}</p>
        </div>
        <div className="float-right">{averageRating && <span className="badge badge-green">{averageRating}</span>}</div>
      </div>
    </div>
  );
};

export default BootcampItem;
