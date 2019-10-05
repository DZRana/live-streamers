import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Input } from "reactstrap";
import "./Sidebar.styles.scss";

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Nav className="col-md-2 d-none d-md-block bg-dark sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
            <p>hi</p>
          </ul>
        </div>
      </Nav>
    );
  }
}

export default Sidebar;
