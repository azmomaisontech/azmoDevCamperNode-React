import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./component/layout/NavBar";
import Home from "./component/layout/Home";
import Alert from "./component/layout/Alert";
import Login from "./component/user/Login";
import ResetPassword from "./component/user/ResetPassword";
import Register from "./component/user/Register";
import ManageAccount from "./component/user/ManageAccount";
import UpdatePassword from "./component/user/UpdatePassword";
import Bootcamps from "./component/bootcamp/Bootcamps";
import BootcampDetails from "./component/bootcamp/BootcampDetails";
import ManageBootcamp from "./component/bootcamp/ManageBootcamp";
import AddBootcamp from "./component/bootcamp/AddBootcamp";
import ManageReview from "./component/reviews/ManageReview";
import ReadReviews from "./component/reviews/ReadReviews";
import AddReview from "./component/reviews/AddReview";
import ManageCourses from "./component/courses/ManageCourses";
import AddCourse from "./component/courses/AddCourse";
import { AlertState } from "./context/alert/AlertState";
import { BootcampState } from "./context/bootcamp/BootcampState";
import PrivateRoute from "./util/PrivateRoute";
import NotFound from "./component/layout/NotFound";
import "./App.css";
import { AuthContext } from "./context/auth/AuthState";

const App = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loadUser } = authContext;

  if (!isAuthenticated && localStorage.token) {
    if (loadUser) loadUser();
  }

  return (
    <AlertState>
      <BootcampState>
        <Router>
          <NavBar />
          <div className="form-container">
            <Alert />
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/resetpassword" component={ResetPassword} />
            <Route exact path="/bootcamps" component={Bootcamps} />
            <Route exact path="/bootcamps/:id" component={BootcampDetails} />
            <PrivateRoute exact path="/manage-bootcamp" component={ManageBootcamp} />
            <PrivateRoute exact path="/add-bootcamp" component={AddBootcamp} />
            <PrivateRoute exact path="/manage-account" component={ManageAccount} />
            <PrivateRoute exact path="/update-password" component={UpdatePassword} />
            <PrivateRoute exact path="/manage-review" component={ManageReview} />
            <Route exact path="/bootcamps/:id/reviews" component={ReadReviews} />
            <PrivateRoute exact path="/bootcamps/:bootcampId/add-review" component={AddReview} />
            <PrivateRoute exact path="/bootcamps/:bootcampId/edit-review/:reviewId" component={AddReview} />
            <PrivateRoute exact path="/bootcamps/:id/add-course" component={AddCourse} />
            <PrivateRoute exact path="/bootcamps/:id/edit-course/:id" component={AddCourse} />
            <PrivateRoute exact path="/bootcamps/:id/manage-course" component={ManageCourses} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </BootcampState>
    </AlertState>
  );
};

export default App;
