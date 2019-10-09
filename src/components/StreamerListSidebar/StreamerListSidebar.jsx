// TODO: Make StreamerCard clickable and change player onClick

import React from "react";
import { Nav } from "reactstrap";
import StreamerCard from "./StreamerCard";
import "./StreamerListSidebar.styles.scss";

const StreamerListSidebar = ({
  liveChannelsStream,
  liveChannelsProfile,
  changeChannel
}) => {
  return (
    <Nav className="col-md-2 d-none d-md-block bg-dark sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <h1>hey</h1>
          {/*
          {liveChannelsStream.map((user, i) => {
            return (
              <StreamerCard
                key={liveChannelsStream[i].id}
                user_name={liveChannelsStream[i].user_name}
                title={liveChannelsStream[i].title}
                viewer_count={liveChannelsStream[i].viewer_count}
                url={`https://www.twitch.tv/${liveChannelsStream[
                  i
                ].user_name.toLowerCase()}`}
                changeChannel={changeChannel}
              />
            );
          })}
        */}
        </ul>
      </div>
    </Nav>
  );
};

export default StreamerListSidebar;
