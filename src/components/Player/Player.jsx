import React from "react";
import TwitchPlayer from "react-player/lib/players/Twitch";

const Player = () => {
  return (
    <TwitchPlayer
      url="https://www.twitch.tv/fuslie"
      width="81.7vw"
      height="95vh"
      controls
      playing
    />
  );
};

export default Player;
