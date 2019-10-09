import React from "react";
import {
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";

const StreamerCard = ({
  user_name,
  title,
  viewer_count,
  url,
  changeChannel
}) => {
  return (
    <div>
      <Card>
        <Button onClick={() => changeChannel(url)}>
          <CardImg
            top
            width="100%"
            src="https://cdn.arstechnica.net/wp-content/uploads/2014/05/twitchtv-640x312.jpg"
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>{user_name}</CardTitle>
            <CardSubtitle>{viewer_count}</CardSubtitle>
            <CardText>{title}</CardText>
          </CardBody>
        </Button>
      </Card>
    </div>
  );
};

export default StreamerCard;
