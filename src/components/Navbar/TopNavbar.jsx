import React from "react";
import { Navbar, NavbarBrand, Button, Row, Col } from "reactstrap";
import StreamerCard from "../StreamerListSidebar/StreamerCard";
import "./TopNavbar.styles.scss";

const TopNavbar = ({ streamerArr, changeChannel }) => {
  return (
    <Navbar color="dark" dark className="fixed-top flex-md-nowrap p-0 shadow">
      <Row>
        <Col className="col-6">
          <NavbarBrand
            href="https://dzrana.github.io/live-streamers/"
            className="col-sm-3 col-md-2 mr-0"
          >
            Live Streamers
          </NavbarBrand>
        </Col>
        <Col className="col-6">
          <div className="d-xl-none dropdown">
            <Button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Streamers
            </Button>
            <div
              className="dropdown-menu bg-dark sidebar streamers"
              aria-labelledby="dropdownMenuButton"
            >
              <ul className="nav flex-column">
                {streamerArr.map((user, i) => {
                  return (
                    <StreamerCard
                      key={streamerArr[i].id}
                      user_name={streamerArr[i].user_name}
                      title={streamerArr[i].title}
                      viewer_count={streamerArr[i].viewer_count}
                      url={`https://www.twitch.tv/${streamerArr[
                        i
                      ].user_name.toLowerCase()}`}
                      profile_image_url={streamerArr[i].profile_image_url}
                      changeChannel={changeChannel}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </Navbar>
  );
};
export default TopNavbar;
