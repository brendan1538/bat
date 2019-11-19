import React from "react";

import CustomBundleItem from "../CustomBundleItem/index";
import defaultContent from "./content.json";
import { Grid } from "semantic-ui-react";

const styles = {
  container: {
    width: "100vw",
    display: "flex",
    flexDirection: "column"
  }
};

const defaultProps = {
  content: defaultContent
};

const CustomBundleContainer = ({ content }) => {
  console.log(content);

  const { bundles } = content;

  return (
    <section id="custom-bundle-container" style={styles.container}>
      <Grid columns={6} centered>
        <Grid.Row>
          {bundles.map((bundle, index) => (
            <CustomBundleItem content={{ ...bundle }} key={index} />
          ))}
        </Grid.Row>
      </Grid>
    </section>
  );
};

CustomBundleContainer.defaultProps = defaultProps;
export default CustomBundleContainer;
