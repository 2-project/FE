import React from "react";

const ImageViewer = (props) => {
  const { pic } = props;
  return (
    <img
      style={{
        width: "400px",
        height: "400px",
        backgroundColor: "gray",
        margin: "0 30px 0 30px",
      }}
      src={pic}
      alt="product pic"
    ></img>
  );
};

export default ImageViewer;
