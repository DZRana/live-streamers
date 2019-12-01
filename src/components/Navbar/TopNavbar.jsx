import React from "react";
import { Navbar, NavbarBrand, Button, Row, Col } from "reactstrap";
import StreamerCard from "../StreamerListSidebar/StreamerCard";
import "./TopNavbar.styles.scss";

const TopNavbar = ({
  liveChannelsStream,
  liveChannelsProfile,
  changeChannel
}) => {
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
                {liveChannelsStream.map((user, i) => {
                  if (
                    liveChannelsProfile.length === liveChannelsStream.length
                  ) {
                    return (
                      <StreamerCard
                        key={liveChannelsStream[i].id}
                        user_name={liveChannelsStream[i].user_name}
                        title={liveChannelsStream[i].title}
                        viewer_count={liveChannelsStream[i].viewer_count}
                        url={`https://www.twitch.tv/${liveChannelsStream[
                          i
                        ].user_name.toLowerCase()}`}
                        profile_image_url={
                          liveChannelsProfile[i].profile_image_url
                        }
                        changeChannel={changeChannel}
                      />
                    );
                  } else
                    return <h1 key={liveChannelsStream[i].id}>LOADING!</h1>;
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
