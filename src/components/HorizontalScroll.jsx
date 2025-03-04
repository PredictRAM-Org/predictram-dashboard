import "../assets/css/horizontalscroll.css";
import CIcon from "@coreui/icons-react";
import { cidArrowCircleLeft, cidArrowCircleRight } from "@coreui/icons-pro";

function HorizontalScroll({ Child, name, noScroll }) {
  const slideLeft = () => {
    var slider = document.getElementById(`slider${name}`);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const slideRight = () => {
    var slider = document.getElementById(`slider${name}`);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  return (
    <div id="main-slider-container">
      {!noScroll && (
        <CIcon
          icon={cidArrowCircleLeft}
          size="3xl"
          className="slider-icon left"
          style={{ cursor: "pointer" }}
          onClick={slideRight}
        />
      )}
      {Child}
      {!noScroll && (
        <CIcon
          icon={cidArrowCircleRight}
          size="3xl"
          className="slider-icon right"
          style={{ cursor: "pointer" }}
          onClick={slideLeft}
        />
      )}
    </div>
  );
}

export default HorizontalScroll;
