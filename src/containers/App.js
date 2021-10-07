import React, { useEffect, useState } from "react";
import TopNavbar from "../components/Navbar/TopNavbar";
import StreamerListSidebar from "../components/StreamerListSidebar/StreamerListSidebar";
import TwitchPlayer from "react-player/lib/players/Twitch";
import { Container, Row, Col, Button } from "reactstrap";
import twitch from "../apis/twitch";

const App = () => {
  const [streamerArr, setStreamerArr] = useState([]);
  const [currentChannel, setCurrentChannel] = useState("");

  const clientId = process.env.REACT_APP_CLIENT_ID;

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
    <Container className="d-flex justify-content-center align-items-center login">
      <a
        href={`https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=https://dzrana.github.io/live-streamers/&response_type=token&scope=channel_feed_read`}
      >
        <Button className="bg-dark">Login</Button>
      </a>
    </Container>
  ) : streamerArr.length === 0 ? (
    <div>LOADING</div>
  ) : (
    <div>
      <TopNavbar streamerArr={streamerArr} changeChannel={changeChannel} />
      <Container fluid>
        <Row className="pt-5">
          <Col className="d-none d-xl-block ">
            <StreamerListSidebar
              streamerArr={streamerArr}
              changeChannel={changeChannel}
            />
          </Col>
          <Col>
            <TwitchPlayer
              url={currentChannel}
              controls
              playing
              width="63vw"
              height="94vh"
            />
          </Col>
          <Col>
            {currentChannel && (
              <iframe
                title="chat"
                frameBorder="0"
                scrolling="yes"
                id="chat_embed"
                src={`https://www.twitch.tv/embed/${currentChannel.substring(
                  22
                )}/chat?parent=dzrana.github.io&darkpopout`}
                width="100%"
                height="100%"
              ></iframe>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
