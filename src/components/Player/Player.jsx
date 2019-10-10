import React from "react";
import TwitchPlayer from "react-player/lib/players/Twitch";

const Player = ({ currentChannel }) => {
  return (
    <TwitchPlayer
      url={currentChannel}
      width="81.7vw"
      height="94.5vh"
      controls
      playing
    />
  );
};

export default Player;
