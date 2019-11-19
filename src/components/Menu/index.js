import React, { Component } from "react";
import { Icon, Menu } from "semantic-ui-react";

export default class MenuLabeledIcons extends Component {
  state = { activeItem: "plus" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu icon="labeled">
        <Menu.Item
          name="plus"
          active={activeItem === "plus"}
          onClick={this.handleItemClick}
        >
          <Icon name="plus" color="green" />
          Create New Bundle
        </Menu.Item>
      </Menu>
    );
  }
}
