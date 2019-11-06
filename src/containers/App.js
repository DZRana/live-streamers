import React, { Component } from "react";
import TopNavbar from "../components/Navbar/TopNavbar";
import StreamerListSidebar from "../components/StreamerListSidebar/StreamerListSidebar";
import Player from "../components/Player/Player";
import { Container, Row, Col } from "reactstrap";
import clientId from "../api/secrets";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      liveChannelsStream: [],
      liveChannelsProfile: [],
      currentChannel: ""
    };
  }

  /*
   async componentDidMount() {
          try {
            setInterval(async () => {
              const res = await fetch('https://api.apijson.com/...');
              const blocks = await res.json();
              const dataPanelone = blocks.panelone;
              const dataPaneltwo = blocks.paneltwo;

              this.setState({
                panelone: dataPanelone,
                paneltwo: dataPaneltwo,
              })
            }, 30000);
          } catch(e) {
            console.log(e);
          }
    }
  */
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
        console.log("CALLED!");
        setTimeout(getStreamerData, 12000);
    } catch (error) {
      console.log("ERROR BRO: ", error);
    }
  }
  getStreamerData();
    /* OLD (had separate live and live profile calls. put them together so they would update together.):Get LIVE channel profiles.
    try {
      setInterval(async () => {
        const { liveChannelsStream } = this.state;
        let queryString = "https://api.twitch.tv/helix/users?login=";
        for (let i = 0; i < liveChannelsStream.length; i++) {
          if (i !== liveChannelsStream.length - 1)
            queryString += `${liveChannelsStream[i].user_name}&login=`;
          else queryString += liveChannelsStream[i].user_name;
        }

        const response = await fetch(queryString, {
          headers: { Authorization: oauth }
        });
        const json = await response.json();
        this.setState({ liveChannelsProfile: json.data });
      }, 12500);
    } catch (error) {
      console.log("ERROR BRO: ", error);
    }
    */
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
      <a
        href={`https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=http://localhost:3000/&response_type=token&scope=channel_feed_read`}
      >
        Sign In
      </a>
    ) : (
      <div>
        <TopNavbar />
        <Container fluid>
          <Row>
            <Col>
              <StreamerListSidebar
                liveChannelsStream={liveChannelsStream}
                liveChannelsProfile={liveChannelsProfile}
                changeChannel={this.changeChannel}
              />
            </Col>
            <Col className="pt-5 pl-5 pr-0 mr-0">
              <Player currentChannel={currentChannel} />
            </Col>
            <Col>
              <iframe
                className="pt-5 pl-0 ml-0"
                title="chat"
                frameBorder="0"
                scrolling="yes"
                id="chat_embed"
                src={`https://www.twitch.tv/embed/${currentChannel.substring(
                  22
                )}/chat?darkpopout`}
                height="920"
                width="350"
              ></iframe>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
