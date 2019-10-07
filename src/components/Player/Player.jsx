import React from "react";
import TwitchPlayer from "react-player/lib/players/Twitch";

const Player = () => {
  return (
    <TwitchPlayer
      url="https://www.twitch.tv/fuslie"
      width="81.7vw"
      height="80vh"
      controls
      playing
    />
  );
};

export default Player;
