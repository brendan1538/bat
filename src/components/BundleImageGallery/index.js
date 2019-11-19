import React, { useState } from 'react';

import BundleGalleryItem from '../BundleGalleryItem/index';

import defaultContent from './default-content.json';

const styles = {
  container: {
    marginTop: '50px',
    width: '100vw',
    height: '40vh',
    minHeight: '450px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
}

const defaultProps = {
  content: defaultContent,
};

const BundleImageGallery = (props) => {
  const { bundles } = props.content;
  return (
    <section id="bundle-image-gallery" style={styles.container}>
      {bundles.map((bundle, index) => (
        <BundleGalleryItem
          content={{ ...bundle }}
          key={index}
        />
      ))}
    </section>
  )
}

BundleImageGallery.defaultProps = defaultProps;
export default BundleImageGallery;