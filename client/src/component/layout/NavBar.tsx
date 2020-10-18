import React, { Fragment } from "react";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";

const NavBar = () => {
  return (
    <Fragment>
      <DesktopNavBar />
      <MobileNavBar />
    </Fragment>
  );
};

export default NavBar;
