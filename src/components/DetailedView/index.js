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
          if (res.status == 200) return res.json();
          throw new Error();
        })
        .then((res) => {
          setImage(res);
          setIsImageLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("An error. Try Again!");
          setIsImageLoading(false);
        });
    }
  }, [isImageLoading, photoId]);
  const handleCLose = useCallback(() => {
    window.history.back();
  }, []);
  const handleDownload = useCallback(() => {
    unsplash.photos.downloadPhoto(image);
  }, [image]);
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
                    src={image.user.profile_image.medium}
                  ></img>
                </div>
                <div className="user-info">
                  <div>
                    <b>{`${image.user.first_name} ${image.user.last_name}`}</b>
                  </div>
                  <div className="user-info__username">{`@${
                    image.user.twitter_username ||
                    image.user.instagram_username ||
                    image.user.username
                  }`}</div>
                </div>
              </div>
              <div className="image-block">
                <img alt={image.alt_description} src={image.urls.small}></img>
              </div>
              <div className="download-block">
                <a href={image.urls.regular} download>
                  Download
                </a>
                {/* <button onClick={handleDownload}> Download</button> */}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default memo(DetailedView);
