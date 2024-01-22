import React from "react";

const ImageViewer = (props) => {
  const { pic } = props;
  const picList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const ImageList = () => {
    return (
      <div
        style={{
          display: "flex",
          width: "420px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "30px",
          backgroundColor: "pink",
          gap: "10px",
        }}
      >
        {picList.map((item) => {
          return (
            <img
              style={{
                width: "52px",
                height: "52px",
                backgroundColor: "gray",
              }}
              alt="item pic"
            ></img>
          );
        })}
      </div>
    );
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
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
      <ImageList></ImageList>
    </div>
  );
};

export default ImageViewer;
