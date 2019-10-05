import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Input } from "reactstrap";
import clientId from "../../api/secrets";

class TopNavbar extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <Navbar color="dark" dark className="fixed-top flex-md-nowrap p-0 shadow">
        <NavbarBrand href="#" className="col-sm-3 col-md-2 mr-0">
          Twitch
        </NavbarBrand>
        <Nav>
          <NavItem>
            <Input placeholder="Search" />
          </NavItem>
          <NavItem>
            <NavLink
              href={`https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=http://localhost:3000/&response_type=token&scope=channel_feed_read`}
            >
              Sign In
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
export default TopNavbar;
