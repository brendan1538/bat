import React, { useState } from 'react';
import axios from 'axios';

const styles = {
  itemContainer: {
    width: '200px',
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    zIndex: '2',
  },
  thumbnail: {
    width: '200px',
    height: '200px',
    flex: 6,
  },
  label: {
    width: '200px',
    height: '50px',
    flex: 1,
    fontSize: '14px',
    textAlign: 'center'
  }
}

const runProcess = (bundle) => {
  axios.get(`localhost:1538/functions/?bundle=${bundle}`)
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

const BundleGalleryItem = ({ content }) => {
  return (
    <section
      id="bundle-gallery-item"
      style={styles.itemContainer}
      onClick={() => runProcess(content.bundle)}
    >
      <img
        src={content.image}
        id="thumbnail"
        style={styles.thumbnail}
      />
      <p id="label" style={styles.label}>{content.name}</p>
    </section>
  )
}

export default BundleGalleryItem;