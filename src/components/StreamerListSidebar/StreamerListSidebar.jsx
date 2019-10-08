import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Input } from "reactstrap";
import StreamerCard from "./StreamerCard";
import "./StreamerListSidebar.styles.scss";

const StreamerListSidebar = ({ streamers }) => {
  return (
    <Nav className="col-md-2 d-none d-md-block bg-dark sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          {streamers.map((user, i) => {
            return (
              <StreamerCard
                key={streamers[i].id}
                user_name={streamers[i].user_name}
                game_id={streamers[i].game_id}
                email={streamers[i].email}
              />
            );
          })}
        </ul>
      </div>
    </Nav>
  );
};

export default StreamerListSidebar;
