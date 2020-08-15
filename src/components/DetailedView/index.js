import React, { memo, useState, useEffect, useCallback } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import Unsplash from "unsplash-js";
// npm install --save-dev @iconify/react @iconify/icons-mdi
import { Icon } from "@iconify/react";
import closeThick from "@iconify/icons-mdi/close-thick";

export const unsplash = new Unsplash({
  accessKey: "JKtfowv6i-uF34qRztTVR4FwBUyLf1RJO_vn13tF_74",
});
function DetailedView() {
  const { photoId } = useParams();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isImageLoading) {
      unsplash.photos
        .getPhoto(photoId)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setImage(res);
          setIsImageLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsImageLoading(false);
          setError("An error. Try Again!");
        });
    }
  }, [isImageLoading, photoId]);
  const handleCLose = useCallback(() => {
    window.history.back();
  }, []);
  return (
    <>
      <div className="backdrop">
        <div className="modal-overlay">
          <div className="close">
            <button onClick={handleCLose}>
              <Icon icon={closeThick}></Icon>
            </button>
          </div>
          {isImageLoading ? (
            <div className="placeholder"> Loading...</div>
          ) : error ? (
            <div className="placeholder">{error}</div>
          ) : (
            <>
              <div className="user">
                <div className="user-avatar">
                  <img
                    alt={image.user.username}
                    src={image.user.profile_image.small}
                  ></img>
                </div>
                <div className="user-info">
                  <div>
                    <i>
                      <b>{`${image.user.first_name} ${image.user.last_name}`}</b>
                    </i>
                  </div>
                  <div>{`@${image.user.twitter_username}`}</div>
                </div>
              </div>
              <div className="image-block">
                <img alt={image.alt_description} src={image.urls.small}></img>
              </div>
              <div className="download-block">
                <a href={image.urls.regular} download>
                  Download
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default memo(DetailedView);
