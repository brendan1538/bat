import React from "react";
import "semantic-ui-css/semantic.min.css";
import Menu from "./components/Menu";
import BundleGallery from "./components/BundleGallery";

function App() {
  return (
    <div className="App">
      <Menu />
      <BundleGallery />
      {/* <CustomBundleContainer /> */}
    </div>
  );
}

export default App;
