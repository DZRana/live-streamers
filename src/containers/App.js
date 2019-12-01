import React, { Component } from "react";
import TopNavbar from "../components/Navbar/TopNavbar";
import StreamerListSidebar from "../components/StreamerListSidebar/StreamerListSidebar";
import TwitchPlayer from "react-player/lib/players/Twitch";
import { Container, Row, Col, Button } from "reactstrap";
var clientId = process.env.REACT_APP_CLIENT_ID;

class App extends Component {
  constructor() {
    super();
    this.state = {
      liveChannelsStream: [],
      liveChannelsProfile: [],
      currentChannel: ""
    };
  }

  async componentDidMount() {
    let userId = "";
    let streamerIdArr = [];
    const oauth = `Bearer ${document.location.hash.substring(14, 44)}`;

    // Get logged-in user's id.
    try {
      const response = await fetch(`https://api.twitch.tv/helix/users`, {
        headers: { Authorization: oauth }
      });
      const json = await response.json();
      userId = json.data[0].id;
    } catch (error) {
      console.log("ERROR BRO: ", error);
    }

    // Get logged-in user's list of followed channels using the received id.
    try {
      const response = await fetch(
        `https://api.twitch.tv/helix/users/follows?from_id=${userId}&first=100`,
        {
          headers: { Authorization: oauth }
        }
      );
      const json = await response.json();
      for (const streamer of json.data) {
        streamerIdArr.push(streamer.to_id);
      }
    } catch (error) {
      console.log("ERROR BRO: ", error);
    }

    // Get LIVE channels and their channel profiles.
    const getStreamerData = async () => {
      try {
        // Get LIVE channels
        let queryString = "https://api.twitch.tv/helix/streams?user_id=";
        for (let i = 0; i < streamerIdArr.length; i++) {
          if (i !== streamerIdArr.length - 1)
            queryString += `${streamerIdArr[i]}&user_id=`;
          else queryString += streamerIdArr[i];
        }

        let response = await fetch(queryString, {
          headers: { Authorization: oauth }
        });
        let json = await response.json();
        this.setState({ liveChannelsStream: json.data });

        // Get their profiles
        queryString = "https://api.twitch.tv/helix/users?login=";
        const { liveChannelsStream } = this.state;
        for (let i = 0; i < liveChannelsStream.length; i++) {
          if (i !== liveChannelsStream.length - 1)
            queryString += `${liveChannelsStream[i].user_name}&login=`;
          else queryString += liveChannelsStream[i].user_name;
        }

        response = await fetch(queryString, {
          headers: { Authorization: oauth }
        });
        json = await response.json();
        this.setState({ liveChannelsProfile: json.data });
        setTimeout(getStreamerData, 12000);
      } catch (error) {
        console.log("ERROR BRO: ", error);
      }
    };
    getStreamerData();
  }

  changeChannel = url => {
    this.setState({ currentChannel: url });
  };

  render() {
    const {
      liveChannelsStream,
      liveChannelsProfile,
      currentChannel
    } = this.state;
    return document.location.hash === "" ? (
      <Container className="d-flex justify-content-center align-items-center login">
        <a
          href={`https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=https://dzrana.github.io/live-streamers/&response_type=token&scope=channel_feed_read`}
        >
          <Button className="bg-dark">Login</Button>
        </a>
      </Container>
    ) : (
      <div>
        <TopNavbar
          liveChannelsStream={liveChannelsStream}
          liveChannelsProfile={liveChannelsProfile}
          changeChannel={this.changeChannel}
        />
        <Container fluid>
          <Row className="pt-5">
            <Col className="d-none d-xl-block ">
              <StreamerListSidebar
                liveChannelsStream={liveChannelsStream}
                liveChannelsProfile={liveChannelsProfile}
                changeChannel={this.changeChannel}
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
                  )}/chat?darkpopout`}
                  width="100%"
                  height="100%"
                ></iframe>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
