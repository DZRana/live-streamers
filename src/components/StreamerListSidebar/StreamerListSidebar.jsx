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
    <Nav className="col-md-2 bg-dark sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          {liveChannelsStream.map((user, i) => {
            if (liveChannelsProfile.length === liveChannelsStream.length) {
              return (
                <StreamerCard
                  key={liveChannelsStream[i].id}
                  user_name={liveChannelsStream[i].user_name}
                  title={liveChannelsStream[i].title}
                  viewer_count={liveChannelsStream[i].viewer_count}
                  url={`https://www.twitch.tv/${liveChannelsStream[
                    i
                  ].user_name.toLowerCase()}`}
                  profile_image_url={liveChannelsProfile[i].profile_image_url}
                  changeChannel={changeChannel}
                />
              );
            } else return <h1 key={liveChannelsStream[i].id}>LOADING!</h1>;
          })}
        </ul>
      </div>
    </Nav>
  );
};

export default StreamerListSidebar;
