import React, { useState, useEffect, useContext } from "react";
import BootcampContext from "../../context/bootcamp/bootcampContext";
import AlertContext from "../../context/alert/alertContext";

const AddBootcamp = props => {
  //Initialize context
  const bootcampContext = useContext(BootcampContext);
  const alertContext = useContext(AlertContext);

  //Destructure items from the bootcamp context
  const {
    currentBootcamp,
    addBootcamp,
    updateBootcamp,
    loading,
    error,
    clearError,
    clearSuccess,
    success
  } = bootcampContext;

  //Destructure items from the alert context
  const { setAlert } = alertContext;

  //use State for form control
  const [bootcamp, setBootcamp] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    careers: [],
    housing: false,
    jobAssistance: false,
    jobGuarantee: false
  });

  const {
    name,
    address,
    phone,
    email,
    website,
    description,
    careers,
    housing,
    jobAssistance,
    jobGuarantee
  } = bootcamp;

  //for page control. To check if we are adding or updating courses.
  //When component mount, check if current Bootcamp has items in it, and then populate the form
  useEffect(() => {
    if (currentBootcamp !== null) {
      setBootcamp(currentBootcamp);
    } else {
      setBootcamp({
        name: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        description: "",
        careers: [],
        housing: false,
        jobAssistance: false,
        jobGuarantee: false
      });
    }

    if (error !== null) {
      setAlert(error, "danger", 4000);
    } else if (currentBootcamp !== null && success) {
      setAlert("Bootcamp Updated Successfully", "success");
      props.history.push("/manage-bootcamp");
    } else if (currentBootcamp === null && success) {
      setAlert("Bootcamp Added Successfully", "success");
      props.history.push("/manage-bootcamp");
    }

    clearSuccess();
    clearError();

    //eslint-disable-next-line
  }, [currentBootcamp, error, success, props.history]);

  //For adding new bootcamp, form control
  const handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setBootcamp({ ...bootcamp, [name]: value });
  };

  const handleMultipleSelect = e => {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }

    setBootcamp({ ...bootcamp, careers: value });
  };

  //To submit form
  const handleSubmit = e => {
    e.preventDefault();

    if (currentBootcamp === null) {
      addBootcamp(bootcamp);
    } else {
      updateBootcamp(bootcamp, currentBootcamp._id);
    }
  };

  return (
    <main id="add-bootcamp">
      <div className="container">
        <div className="bootcamp">
          <h2 className="m-heading">Add Bootcamp</h2>
          <p>
            Important: You must be affiliated with a bootcamp to add to
            DevCamper
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="location">
                <h2 className="s-heading">Location & Contact</h2>
                <p>If multiple locations, use the main or largest</p>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="Bootcamp Name"
                    required
                  />
                </div>
                {currentBootcamp !== null ? (
                  <p className="text-danger">
                    *Please send an email to the admin to edit your Bootcamp
                    Address
                  </p>
                ) : (
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={address}
                      onChange={handleChange}
                      placeholder="Street, City, State, Countrycode"
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                    placeholder="Phone"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Contact Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    name="website"
                    value={website}
                    onChange={handleChange}
                    placeholder="Website Url e.g https://devcentral.com"
                  />
                </div>
              </div>
              <div className="other-info">
                <h2 className="s-heading">Other Info</h2>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    cols="30"
                    rows="10"
                    value={description}
                    onChange={handleChange}
                    placeholder="Description (What you offer)"
                    required
                  ></textarea>
                  <p>No more than 500 characters</p>
                </div>

                <div className="form-group">
                  <label htmlFor="careers">Careers</label>
                  <select
                    name="careers"
                    onChange={handleMultipleSelect}
                    value={careers}
                    size="4"
                    multiple
                    required
                  >
                    <option disabled>Select all that apply</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Development">
                      Mobile Development
                    </option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </select>
                  <p>
                    Hold down the shift button and click to select multiple
                    items
                  </p>
                </div>

                <div className="form-group">
                  <input
                    type="checkbox"
                    checked={housing}
                    name="housing"
                    onChange={handleChange}
                  />{" "}
                  Housing <br />
                  <input
                    type="checkbox"
                    checked={jobAssistance}
                    onChange={handleChange}
                    name="jobAssistance"
                  />{" "}
                  Job Assistance
                  <br />
                  <input
                    type="checkbox"
                    checked={jobGuarantee}
                    onChange={handleChange}
                    name="jobGuarantee"
                  />{" "}
                  Job Guarantee
                  <br />
                </div>
                <p className="warning">
                  *After you submit the bootcamp, you can add the specific
                  courses offered via Manage Bootcamp.
                </p>
              </div>
            </div>
            <input
              type="submit"
              className="btn btn-green btn-block"
              value={loading ? "Loading...." : "Submit Bootcamp"}
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddBootcamp;
