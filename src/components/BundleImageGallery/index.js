import React, { useState } from "react";
import { Card } from "semantic-ui-react";

import BundleGalleryItem from "../BundleGalleryItem/index";
import defaultContent from "./default-content.json";

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

const BundleImageGallery = props => {
  const { bundles } = props.content;
  return (
    <section id="bundle-image-gallery" style={styles.container}>
      <Card.Group centered>
        {bundles.map((bundle, index) => (
          <BundleGalleryItem content={{ ...bundle }} key={index} />
        ))}
      </Card.Group>
    </section>
  );
};

BundleImageGallery.defaultProps = defaultProps;
export default BundleImageGallery;
