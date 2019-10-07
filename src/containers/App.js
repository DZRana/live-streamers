import React, { Component } from "react";
import StreamerList from "../components/StreamerList";
import TopNavbar from "../components/Navbar/TopNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Player from "../components/Player/Player";
import { Jumbotron, Container, Button, Row, Col } from "reactstrap";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
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

  async onButtonClick() {
    const oauth = `Bearer ${document.location.hash.substring(14, 44)}`;
    console.log(oauth);

    try {
      const response = await fetch(
        `https://api.twitch.tv/helix/streams?user_id=83402203`,
        {
          headers: { Authorization: oauth }
        }
      );
      const json = await response.json();
      console.log(json);
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
              <Sidebar />
            </Col>
            <Col className="pt-5">
              <Player />
              <Button onClick={() => this.onButtonClick()}>CLICK ME</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
