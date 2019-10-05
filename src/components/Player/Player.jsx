import React from "react";
import TwitchPlayer from "react-player/lib/players/Twitch";

const Player = () => {
  return (
    <TwitchPlayer
      url="https://www.twitch.tv/fuslie"
      width="80vw"
      height="100vh"
      controls
      playing
    />
  );
};

export default Player;
