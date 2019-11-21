import React from "react";
import axios from "axios";
import { Card, Icon, Image, Popup, Button } from "semantic-ui-react";

const runProcess = bundle => {
  axios
    .get(`http://localhost:1538/runBundle/?bundle=${bundle}`)
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

const BundleGalleryItem = ({ content }) => {
  const { image, name, bundle } = content;

  return (
    <Card>
      <Image
        src={image}
        wrapped
        ui={false}
        style={{ cursor: "pointer" }}
        onClick={() => runProcess(bundle)}
      />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Description>Description</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Popup
            trigger={
              <Button icon>
                <Icon name="settings" />
              </Button>
            }
            content={
              <>
                <Button color="green" content="Test" />
                <div className="ui input">
                  <input type="text" placeholder="Update Name..." />
                </div>
              </>
            }
            on="click"
            position="top right"
          />
          <Button
            content="Run Bundle"
            primary
            onClick={() => runProcess(bundle)}
          />
        </div>
      </Card.Content>
    </Card>
  );
};

export default BundleGalleryItem;
