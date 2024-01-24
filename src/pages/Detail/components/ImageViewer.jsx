import React, { useEffect, useState } from "react";
import DefaultPic from "../../../assets/detail/goods_default.png";

const ImageViewer = ({ data }) => {
  const [imgView, setImgView] = useState(null);
  console.log("ddd", data);

  const handleChangeViewer = (img) => {
    setImgView(img);
  };

  useEffect(() => {
    if (data.productImages) {
      setImgView(data.productImages[0].productImagePath);
    }
  }, [data]);
  const ImageList = () => {
    return (
      <div
        style={{
          display: "flex",
          width: "420px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "30px",
          gap: "10px",
        }}
      >
        {data?.productImages?.map((item) => {
          return (
            <img
              className="detail-img-small"
              src={item?.productImagePath}
              alt="item pic"
              onError={(event) => {
                event.target.src = DefaultPic;
                event.onerror = null;
              }}
              onMouseEnter={() => handleChangeViewer(item?.productImagePath)}
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
          margin: "0 30px 0 30px",
          border: "1px solid #ccc",
        }}
        src={imgView}
        alt="product pic"
      ></img>
      <ImageList></ImageList>
    </div>
  );
};

export default ImageViewer;
