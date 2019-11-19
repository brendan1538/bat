import React, { useState } from "react";
import axios from "axios";
import { Card, Icon, Image, Popup, Button, Container } from "semantic-ui-react";

const runProcess = bundle => {
  axios
    .get(`localhost:1538/functions/?bundle=${bundle}`)
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

const BundleGalleryItem = ({ content }) => {
  const { image, name } = content;

  return (
    <Card>
      <Image src={image} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Description>Description</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Popup
          trigger={<Icon name="settings" />}
          content={
            <>
              <Button color="green" content="Test" />
              <div class="ui input">
                <input type="text" placeholder="Update Name..." />
              </div>
            </>
          }
          on="click"
          position="top right"
        />
      </Card.Content>
    </Card>
  );
};

export default BundleGalleryItem;
