import React, { Component } from "react";
import { Modal, Form, Button, Header } from "semantic-ui-react";
import axios from "axios";

import ActionInputs from "../ActionInputs";

const styles = {
  submit: {
    padding: "20px 0 40px 0"
  }
};

const sendNewBundle = bundle => {
  console.log("Sending new Bundle to backend:", bundle);

  axios
    .post(`http://localhost:1538/createBundle/`, bundle)
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

class CreateBundleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      description: "",
      actions: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeAction = this.removeAction.bind(this);
  }

  updateActionState(index, name, value) {
    let actions = [...this.state.actions];
    actions[index][name] = value;

    this.setState({ actions });
  }

  // If we update the type of the action we should give them a default command
  updateActionType(event) {
    const target = event.target;
    const value = target.value;

    if (value === "docker") {
      this.updateActionState(target.dataset.id, "command", "docker-compose up");
    }
    if (value === "git") {
      this.updateActionState(target.dataset.id, "command", "git checkout");
    }
    if (value === "url") {
      this.updateActionState(target.dataset.id, "command", "open ");
    }
    if (value === "sr") {
      this.updateActionState(target.dataset.id, "command", "sr");
    }
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    if (target.id.includes("action")) {
      this.updateActionState(target.dataset.id, target.className, value);
    } else {
      this.setState({ [name]: target.value });
    }

    if (target.id.includes("Type")) {
      this.updateActionType(event);
    }
  }

  handleSubmit = event => {
    const { handleModal } = this.props;
    const data = {
      ...this.state
    };

    sendNewBundle(data);
    handleModal();
  };

  addAction = event => {
    this.setState(prevState => ({
      actions: [
        ...prevState.actions,
        { type: "", name: "", command: "", args: "", directory: "" }
      ]
    }));
  };

  removeAction = event => {
    const index = event.target.dataset.id;

    this.setState(
      prevState => ({
        actions: prevState.actions.splice(index, 1)
      }),
      () => console.log(this.state)
    );
  };

  render() {
    const { name, image, description, actions } = this.state;
    return (
      <Modal.Content>
        <Header>Create a New Bundle</Header>
        <Modal.Description>
          <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                label="Bundle Name"
                placeholder="Bundle Name"
                value={name}
                name="name"
              />
              <Form.Input
                label="Image URL"
                placeholder="Image URL"
                value={image}
                name="image"
              />
            </Form.Group>
            <Form.TextArea
              label="Description"
              placeholder="Description"
              value={description}
              name="description"
            />
            {actions && (
              <ActionInputs
                actions={actions}
                handleDelete={this.removeAction}
                handleChange={this.handleChange}
              />
            )}
            <Form.Group>
              <Button
                primary
                onClick={this.addAction}
                content="Add an Action"
                type="button"
              />
            </Form.Group>
            <Form.Field style={styles.submit}>
              <Button floated="right" type="submit" positive>
                Create Bundle
              </Button>
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
    );
  }
}

export default CreateBundleModal;
