import React, { useEffect, useState } from "react";
import TopNavbar from "../components/Navbar/TopNavbar";
import StreamerListSidebar from "../components/StreamerListSidebar/StreamerListSidebar";
import TwitchPlayer from "react-player";
import twitch from "../apis/twitch";

const App = () => {
  const [streamerArr, setStreamerArr] = useState([]);
  const [currentChannel, setCurrentChannel] = useState("");

  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirect_baseUri = "https://dzrana.github.io/live-streamers/";
  const chat_url = "dzrana.github.io";
  const redirect_baseUri_local = "http://localhost:3000/";
  const chat_url_local = "localhost:3000";

  const getUserData = async () => {
    let userId = "";
    let streamerIdArr = [];

    // Get logged-in user's id.
    let response = await twitch.get("/users");
    userId = response.data.data[0].id;

    // Get logged-in user's list of followed channels using the received id.
    response = await twitch.get("/users/follows", {
      params: {
        from_id: userId,
        first: 100,
      },
    });
    for (let streamer of response.data.data) {
      streamerIdArr.push(streamer.to_id);
    }

    // Get LIVE channels and their channel profiles.
    // Get LIVE channels
    const getStreamerData = async () => {
      let queryString = "/streams?user_id=";
      for (let i = 0; i < streamerIdArr.length; i++) {
        if (i !== streamerIdArr.length - 1)
          queryString += `${streamerIdArr[i]}&user_id=`;
        else queryString += streamerIdArr[i];
      }
      response = await twitch.get(queryString);
      let newStreamerArr = [];
      for (let streamer of response.data.data) {
        let attr = {};
        attr["id"] = streamer.id;
        attr["user_name"] = streamer.user_name;
        attr["title"] = streamer.title;
        attr["viewer_count"] = streamer.viewer_count;
        newStreamerArr.push(attr);
      }

      // Get their profiles
      queryString = "/users?login=";
      for (let i = 0; i < newStreamerArr.length; i++) {
        if (i !== newStreamerArr.length - 1)
          queryString += `${newStreamerArr[i].user_name}&login=`;
        else queryString += newStreamerArr[i].user_name;
      }

      response = await twitch.get(queryString);
      for (let existingStreamer of newStreamerArr) {
        for (let streamerProfile of response.data.data) {
          if (
            existingStreamer.user_name.toLowerCase() === streamerProfile.login
          ) {
            existingStreamer["profile_image_url"] =
              streamerProfile.profile_image_url;
          }
        }
      }
      setStreamerArr(newStreamerArr);
      setTimeout(getStreamerData, 12000);
    };
    getStreamerData();
  };

  const changeChannel = (url) => {
    setCurrentChannel(url);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return document.location.hash === "" ? (
    <div className="flex h-screen">
      <span className="m-auto">
        <a
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          href={`https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirect_baseUri}&response_type=token&scope=channel_feed_read`}
        >
          Login
        </a>
      </span>
    </div>
  ) : streamerArr.length === 0 ? (
    <div className="flex h-screen">
      <span className="m-auto text-white font-bold">LOADING</span>
    </div>
  ) : (
    <div className="h-screen w-screen">
      <TopNavbar streamerArr={streamerArr} changeChannel={changeChannel} />
      <div className="hidden">
        <StreamerListSidebar
          streamerArr={streamerArr}
          changeChannel={changeChannel}
        />
      </div>
      <div className="flex flex-col w-screen h-screen sm:flex-row">
        <div className="w-full h-1/2 sm:w-2/3 sm:h-full lg:w-4/5">
          <TwitchPlayer
            url={currentChannel}
            controls
            playing
            width="100%"
            height="100%"
          />
        </div>
        <div className="w-full h-1/2 sm:w-1/3 sm:h-full lg:w-1/5">
          {currentChannel && (
            <iframe
              title="chat"
              frameBorder="0"
              scrolling="yes"
              id="chat_embed"
              src={`https://www.twitch.tv/embed/${currentChannel.substring(
                22
              )}/chat?parent=${chat_url}&darkpopout`}
              width="100%"
              height="100%"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
