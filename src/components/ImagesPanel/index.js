import React, { memo } from "react";
import "./style.scss";
import { Link } from "react-router-dom";

function ImagesPanel({ images }) {
  return (
    <div class="image-panel">
      {images.map((image) => {
        return (
          <Link to={`/${image.id}`}>
            <div class="image-block">
              <img alt={image.alt_description} src={image.urls.small}></img>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
export default memo(ImagesPanel);
