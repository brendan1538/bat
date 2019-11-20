import React from "react";
import { Item, Grid } from "semantic-ui-react";

const styles = {
  item: {
    width: "200px",
    height: "250px",
    display: "flex",
    flexDirection: "column",
    zIndex: "2"
  }
};

const CustomBundleItem = ({ content }) => {
  const { image } = content;
  return (
    <Grid.Column>
      <Item>
        <Item.Image size="tiny" src={image} style={{ cursor: 'pointer' }}/>
        <Item.Content>
          <Item.Header as="a">Custom Bundle</Item.Header>
          <Item.Description>Description</Item.Description>
        </Item.Content>
      </Item>
    </Grid.Column>
  );
};

export default CustomBundleItem;
