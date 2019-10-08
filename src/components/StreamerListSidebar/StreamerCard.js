import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";

const StreamerCard = ({ user_name, title, viewer_count }) => {
  return (
    <div>
      <Card>
        <CardImg
          top
          width="100%"
          src="/assets/318x180.svg"
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{user_name}</CardTitle>
          <CardSubtitle>{viewer_count}</CardSubtitle>
          <CardText>{title}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default StreamerCard;
