import React, { Component } from "react";
import StreamerList from "../components/StreamerList";
import { Jumbotron, Container, Button } from "reactstrap";
import TwitchPlayer from "react-player/lib/players/Twitch";
import "./App.css";
import clientId from "../api/secrets";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async onButtonPress() {
    const oauth = `Bearer ${document.location.hash.substring(14, 44)}`;
    console.log(oauth);

    try {
      const response = await fetch(`https://api.twitch.tv/helix/users`, {
        headers: { Authorization: oauth }
      });
      const json = await response.json();
      console.log(json.data[0].id);
    } catch (error) {
      console.log("ERROR BRO: ", error);
    }
  }

  render() {
    return (
      <div className="d-flex align-items-center min-vh-100">
        <TwitchPlayer
          url="https://www.twitch.tv/videos/488888886"
          width="1500px"
          height="500px"
          controls
        />
        <Container className="text-center">
          <a
            href={`https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=http://localhost:3000/&response_type=token&scope=channel_feed_read`}
            className="btn btn-primary"
          >
            Sign In
          </a>
          <Button onClick={() => this.onButtonPress()}>CLICK ME!</Button>
        </Container>
      </div>
    );
    {
      /*
      <Container fluid className="text-center mt-2">
        <Jumbotron>
          <h1>Twitch Test</h1>
        </Jumbotron>
        <StreamerList />
      </Container>
      */
    }
  }
}

export default App;