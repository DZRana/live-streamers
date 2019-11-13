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
import "./StreamerCard.styles.scss";

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
      <Card className="ml-2 mr-2 mb-1">
        <Button onClick={() => changeChannel(url)}>
          <CardImg
            top
            width="100%"
            src={profile_image_url}
            alt="Profile Image"
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
