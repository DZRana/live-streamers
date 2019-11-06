import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

const TopNavbar = () => {
  return (
    <Navbar color="dark" dark className="fixed-top flex-md-nowrap p-0 shadow">
        <NavbarBrand
          href="http://localhost:3000"
          className="col-sm-3 col-md-2 mr-0"
        >
          Twitch
        </NavbarBrand>
      </Navbar>
  );
};
export default TopNavbar;
