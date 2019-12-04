import React, { Component } from "react";
import { Icon, Menu, Modal } from "semantic-ui-react";

import CreateBundleModal from "../CreateBundleModal";

const styles = {
  newBundle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto !important",
    width: "100%",
    height: "100%",
  }
}
export default class MenuLabeledIcons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };

    this.handleModal = this.handleModal.bind(this);
  }

  handleModal = event => {
    this.setState(prevState => ({ modalOpen: !prevState.modalOpen }));
  };

  render() {
    return (
      <Menu icon="labeled">
        <Menu.Item>
          <img style={{ width: "75px", margin: "auto" }} src="logo.svg" />
        </Menu.Item>
        <Modal
          closeIcon
          open={this.state.modalOpen}
          onClose={this.handleModal}
          trigger={
            <Menu.Item name="plus" onClick={this.handleModal}>
              <div style={styles.newBundle}>
                <Icon name="plus" color="green" style={{ width: "100%", height: "40%", fontSize: "1.3em" }} />
                New Bundle
              </div>
            </Menu.Item>
          }
        >
          <CreateBundleModal handleModal={this.handleModal} />
        </Modal>
      </Menu>
    );
  }
}
