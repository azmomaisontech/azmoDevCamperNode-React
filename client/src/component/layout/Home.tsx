import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BootcampContext } from "../../context/bootcamp/BootcampState";
import { FormEventProps } from "../../context/type";

const Home: React.FC = () => {
  const history = useHistory();

  const [distance, setDistance] = useState({
    miles: "",
    zipcode: "",
  });

  const bootcampContext = useContext(BootcampContext);

  const { filterBootcamp } = bootcampContext;

  const handleChange = (e: FormEventProps) => {
    setDistance({ ...distance, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (filterBootcamp) filterBootcamp(zipcode, miles);
    history.push("/bootcamps");
  };
  const { miles, zipcode } = distance;

  return (
    <main id="home-main">
      <div className="container showcase-content">
        <h2 className="l-heading">Find a Code Bootcamp</h2>
        <h3 className="s-heading">Find, rate and read reviews on coding bootcamps</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="miles"
            value={miles}
            onChange={handleChange}
            placeholder="Search Radius e.g 10"
            required
          />
          <input
            type="text"
            name="zipcode"
            value={zipcode}
            onChange={handleChange}
            placeholder="Zipcode e.g 02118"
            required
          />
          <input className="btn btn-block btn-primary" type="submit" value="Filter Bootcamps" />
        </form>
        <Link className="btn btn-block standalone" to="/bootcamps">
          Browse All Bootcamps
        </Link>
      </div>
    </main>
  );
};

export default Home;
