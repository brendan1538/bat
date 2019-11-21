import React from "react";
import "semantic-ui-css/semantic.min.css";
import Menu from "./components/Menu";
import BundleImageGallery from "./components/BundleImageGallery";
import CustomBundleContainer from "./components/CustomBundleContainer";

function App() {
  return (
    <div className="App">
      <Menu />
      <BundleImageGallery />
      {/* <CustomBundleContainer /> */}
    </div>
  );
}

export default App;
