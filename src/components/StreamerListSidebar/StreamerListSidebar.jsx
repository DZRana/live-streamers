import React from "react";
import { Nav } from "reactstrap";
import StreamerCard from "./StreamerCard";
import "./StreamerListSidebar.styles.scss";

const StreamerListSidebar = ({ streamerArr, changeChannel }) => {
  return (
    <Nav className="col-md-2 bg-dark sidebar">
      <div className="sidebar-sticky">
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
    </Nav>
  );
};

export default StreamerListSidebar;
