import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, Input } from "reactstrap";

class TopNavbar extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Navbar color="dark" dark className="fixed-top flex-md-nowrap p-0 shadow">
        <NavbarBrand href={document.URL} className="col-sm-3 col-md-2 mr-0">
          Twitch
        </NavbarBrand>
        <Nav>
          <NavItem>
            <Input placeholder="Search" />
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
export default TopNavbar;
