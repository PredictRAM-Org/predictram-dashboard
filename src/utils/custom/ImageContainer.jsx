import React, { useState } from "react";
import { ReactComponent as EditIcon } from "../../assets/images/editIcon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/images/deleteIcon.svg";

function ImageContainer({
  imgSrc,
  refSrc,
  setImgSrc,
  autoSave = false,
  localImageId,
}) {
  const [isHoveringOnImage, setIsHoveringOnImage] = useState(false);

  const handleClick = (event) => {
    refSrc.current.click();
  };

  return (
    <div
      style={{
        width: "100%",
        height: "fit-content",
        maxWidth: "50rem",
        position: "relative",
        margin: "0 auto",
        marginTop: "3rem",
        borderRadius: "0.75rem",
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsHoveringOnImage(true)}
      onMouseLeave={() => setIsHoveringOnImage(false)}
    >
      <img
        alt="..."
        src={imgSrc}
        style={{
          width: "100%",
          height: "fit-content",
          maxHeight: "28rem",
          objectFit: "cover",
        }}
      />
      <div
        className="d-flex justify-content-center align-items-center w-100 h-100"
        style={{
          position: "absolute",
          background: "rgba(0,0,0,0.6)",
          top: "0",
          left: "0",
          transition: "opacity 0.3s ease-in-out",
          opacity: isHoveringOnImage ? "1" : "0",
          pointerEvents: isHoveringOnImage ? "auto" : "none",
          gap: "0.75rem",
        }}
      >
        <EditIcon
          onClick={handleClick}
          style={{
            cursor: "pointer",
          }}
        />
        <DeleteIcon
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            setImgSrc(null);
            if (autoSave) {
              localStorage.removeItem(localImageId);
            }

            refSrc.current.value = null;
          }}
        />
      </div>
    </div>
  );
}

export default ImageContainer;
