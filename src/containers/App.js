import React, { Component } from "react";
import StreamerList from "../components/StreamerListSidebar/StreamerListSidebar";
import TopNavbar from "../components/Navbar/TopNavbar";
import StreamerListSidebar from "../components/StreamerListSidebar/StreamerListSidebar";
import Player from "../components/Player/Player";
import { Jumbotron, Container, Button, Row, Col } from "reactstrap";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      streamers: []
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

    // Get only the LIVE channels.
    try {
      let queryString = "https://api.twitch.tv/helix/streams?user_id=";
      for (let i = 0; i < streamerIdArr.length; i++) {
        if (i !== streamerIdArr.length - 1)
          queryString += `${streamerIdArr[i]}&user_id=`;
        else queryString += streamerIdArr[i];
      }

      const response = await fetch(queryString, {
        headers: { Authorization: oauth }
      });
      const json = await response.json();
      this.setState({ streamers: json.data });
      console.log(this.state.streamers);
    } catch (error) {
      console.log("ERROR BRO: ", error);
    }

    // TODO: Get LIVE channel profiles.
    try {
      let queryString = "https://api.twitch.tv/helix/users?login=";
      for (let i = 0; i < this.state.streamers.length; i++) {
        if (i !== this.state.streamers.length - 1)
          console.log(i, this.state.streamer[i]);
        else queryString += streamerIdArr[i];
      }

      const response = await fetch(queryString, {
        headers: { Authorization: oauth }
      });
      const json = await response.json();
      this.setState({ streamers: json.data });
      console.log(this.state.streamers);
    } catch (error) {
      console.log("ERROR BRO: ", error);
    }
  }

  render() {
    return (
      <div>
        <TopNavbar />
        <Container fluid>
          <Row>
            <Col>
              <StreamerListSidebar streamers={this.state.streamers} />
            </Col>
            <Col className="pt-5">
              <Player />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
