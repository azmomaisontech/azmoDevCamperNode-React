import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BootcampContext } from "../../context/bootcamp/BootcampState";

const Home: React.FC = () => {
  const [distance, setDistance] = useState({
    miles: "",
    zipcode: "",
  });

  const history = useHistory();

  const bootcampContext = useContext(BootcampContext);

  const { filterBootcamp, getBootcamps } = bootcampContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistance({ ...distance, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    filterBootcamp(zipcode, miles);
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
        <Link className="btn btn-block standalone" onClick={() => getBootcamps()} to="/bootcamps">
          Browse All Bootcamps
        </Link>
      </div>
    </main>
  );
};

export default Home;
