import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import axios from "axios";

import BundleGalleryItem from "../BundleGalleryItem/index";
import defaultContent from "./default-content.json";

const getBundles = bundle => {
  return axios
    .get(`http://localhost:1538/getBundles`)
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(err => console.error(err));
};

const styles = {
  container: {
    marginTop: "50px",
    width: "100vw",
    minHeight: "450px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: "60px 0"
  }
};

const defaultProps = {
  content: defaultContent
};

class BundleGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bundles: []
    };
  }
  componentDidMount() {
    getBundles().then(data => {
      this.setState({
        bundles: data
      });
    });
  }
  render() {
    const { bundles } = this.state;
    return (
      <section id="bundle-image-gallery" style={styles.container}>
        <Card.Group centered>
          {bundles && bundles.map((bundle, index) => (
            <BundleGalleryItem content={{ ...bundle }} key={index} />
          ))}
        </Card.Group>
      </section>
    );
  }
}

BundleGallery.defaultProps = defaultProps;
export default BundleGallery;
