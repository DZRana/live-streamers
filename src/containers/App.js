import React, { Component } from "react";
import StreamerList from "../components/StreamerList";
import { Jumbotron, Container, Button } from "reactstrap";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async onButtonPress() {
    try {
      const response = await fetch(
        "https://id.twitch.tv/oauth2/authorize?client_id=oj5sely04mm226nxlcg9uu7maodn2n&redirect_uri=http://localhost&response_type=token&scope=channel_feed_read"
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("ERROR BRO: ", error);
    }
  }

  render() {
    return (
      <div className="d-flex align-items-center min-vh-100">
        <Container className="text-center">
          <a
            href="https://id.twitch.tv/oauth2/authorize?client_id=oj5sely04mm226nxlcg9uu7maodn2n&redirect_uri=http://localhost:3000/&response_type=token&scope=channel_feed_read"
            className="btn btn-primary"
          >
            Sign In
          </a>
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
