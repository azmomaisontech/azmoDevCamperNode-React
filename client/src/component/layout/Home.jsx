import React, { useContext, useState } from "react";
import BootcampContext from "../../context/bootcamp/bootcampContext";

const Home = props => {
  const [distance, setDistance] = useState({
    miles: "",
    zipcode: ""
  });

  const bootcampContext = useContext(BootcampContext);

  const { filterBootcamp } = bootcampContext;

  const handleChange = e => {
    setDistance({ ...distance, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    filterBootcamp(zipcode, miles);
    props.history.push("/bootcamps");
  };
  const { miles, zipcode } = distance;

  return (
    <main id="home-main">
      <div className="container showcase-content">
        <h2 className="l-heading">Find a Code Bootcamp</h2>
        <h3 className="s-heading">
          Find, rate and read reviews on coding bootcamps
        </h3>
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
          <input
            className="btn btn-block btn-primary"
            type="submit"
            value="Find Bootcamps"
          />
        </form>
      </div>
    </main>
  );
};

export default Home;
