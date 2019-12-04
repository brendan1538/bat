import React from "react";
import axios from "axios";
import {
  Card,
  Icon,
  Image,
  Popup,
  Button,
  Form,
  Header
} from "semantic-ui-react";

const runProcess = bundle => {
  axios
    .get(`http://localhost:1538/runBundle/?bundle=${bundle}`)
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

const BundleGalleryItem = ({ content }) => {
  const { image, name, description } = content;

  return (
    <Card>
      <Image
        src={image}
        wrapped
        ui={false}
        style={{ cursor: "pointer" }}
        onClick={() => runProcess(name)}
      />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Description>
          {description && description}
        </Card.Description>
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
              <Form>
                <Header>Update Bundle</Header>
                <Form.Field>
                  <div className="ui input">
                    <input type="text" placeholder="Name..." />
                  </div>
                </Form.Field>
                <Form.Field>
                  <div className="ui input">
                    <input type="text" placeholder="Description..." />
                  </div>
                </Form.Field>
                <Form.Field>
                  <div className="ui input">
                    <input type="text" placeholder="Type..." />
                  </div>
                </Form.Field>
                <Form.Field>
                  <div className="ui input">
                    <input type="text" placeholder="Command..." />
                  </div>
                </Form.Field>
                <Form.Field>
                  <div className="ui input">
                    <input type="text" placeholder="Args..." />
                  </div>
                </Form.Field>
                <Form.Field>
                  <div className="ui input">
                    <input type="text" placeholder="Directory..." />
                  </div>
                </Form.Field>
                <Button color="green" content="Save" />
              </Form>
            }
            on="click"
            position="top right"
          />
          <Button
            content="Run Bundle"
            primary
            onClick={() => runProcess(name)}
          />
        </div>
      </Card.Content>
    </Card>
  );
};

export default BundleGalleryItem;
