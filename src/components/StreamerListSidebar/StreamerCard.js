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
  profile_image_url,
  changeChannel
}) => {
  return (
    <div>
      <Card>
        <Button onClick={() => changeChannel(url)}>
          <CardImg
            top
            width="100%"
            src={profile_image_url}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>{user_name}</CardTitle>
            <CardSubtitle>{title}</CardSubtitle>
            <CardText>{`Viewers: ${viewer_count}`}</CardText>
          </CardBody>
        </Button>
      </Card>
    </div>
  );
};

export default StreamerCard;
