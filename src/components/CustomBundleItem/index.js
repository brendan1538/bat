import React from "react";
import { Item, Grid } from "semantic-ui-react";

const CustomBundleItem = ({ content }) => {
  const { image } = content;
  return (
    <Grid.Column>
      <Item>
        <Item.Image size="tiny" src={image} style={{ cursor: "pointer" }} />
        <Item.Content>
          <Item.Header as="a">Custom Bundle</Item.Header>
          <Item.Description>Description</Item.Description>
        </Item.Content>
      </Item>
    </Grid.Column>
  );
};

export default CustomBundleItem;
