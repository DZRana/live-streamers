import React from "react";
import StreamerCard from "./StreamerCard";

const StreamerListSidebar = ({ streamerArr, changeChannel }) => {
  return (
    <ul>
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
  );
};

export default StreamerListSidebar;
