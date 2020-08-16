import React, { memo, useState, useCallback, useEffect } from "react";
import Unsplash from "unsplash-js";
import { Route } from "react-router-dom";
// npm install --save-dev @iconify/react @iconify/icons-mdi
import { Icon, InlineIcon } from "@iconify/react";
import cardSearch from "@iconify/icons-mdi/card-search";

import ImagesPanel from "../../components/ImagesPanel";
import DetailedView from "../../components/DetailedView";
import "./style.scss";

export const unsplash = new Unsplash({
  accessKey: "JKtfowv6i-uF34qRztTVR4FwBUyLf1RJO_vn13tF_74",
});

function ImageSearchPage() {
  const [searchString, setSearchString] = useState("");
  const [areImagesLoading, setAreImagesLoading] = useState(true);
  const [areMoreIMagesLoading, setAreMoreImagesLoading] = useState(false);
  const [showingRandom, setShowingRandom] = useState(true);
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    getRandomPhotos();
  }, []);

  useEffect(() => {
    if (showingRandom && areMoreIMagesLoading) {
      getRandomPhotos();
    } else if (areMoreIMagesLoading) {
      getSearchedPhotos(searchString);
    } else if (!showingRandom && areImagesLoading) {
      getSearchedPhotos(searchString);
    }
  }, [showingRandom, areImagesLoading, areMoreIMagesLoading]);
  const getRandomPhotos = () => {
    unsplash.photos
      .getRandomPhoto({ count: 9 })
      .then((res) => {
        if (res.status === 200) return res.json();
        else throw new Error();
      })

      .then((res) => {
        setImages([...images, ...res]);
        setAreImagesLoading(false);
        setAreMoreImagesLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setImages([]);
        setAreMoreImagesLoading(false);

        setAreImagesLoading(false);
      });
  };
  const getSearchedPhotos = (searchString) => {
    unsplash.search
      .photos(searchString, currentPage, 9, { orientation: "landscape" })
      .then((response) => {
        if (response.status === 200) return response.json();
        else throw new Error();
      })
      .then((res) => {
        setImages([...images, ...res.results]);
        setTotalPages(res.total_pages);
        setAreMoreImagesLoading(false);

        setAreImagesLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setImages([]);
        setAreMoreImagesLoading(false);

        setAreImagesLoading(false);
      });
  };
  const handleInputChange = useCallback((event) => {
    setSearchString(event.target.value);
  }, []);
  const handleSearch = useCallback(
    (event) => {
      event.preventDefault();
      if (searchString) {
        setShowingRandom(false);
        setImages([]);
        setAreImagesLoading(true);
      }
    },
    [searchString]
  );
  const loadMore = useCallback(
    (pageNumber) => {
      setAreMoreImagesLoading(true);

      if (!showingRandom) setCurrentPage(pageNumber);
    },
    [showingRandom]
  );

  return (
    <main className="main-block">
      <form onSubmit={handleSearch} className="search-box">
        <input
          value={searchString}
          onChange={handleInputChange}
          placeholder="Search for images here..."
        ></input>
        <button type="submit">
          <Icon icon={cardSearch} className="search-button"></Icon>
        </button>
      </form>
      {areImagesLoading ? (
        <div className="placeholder"> Loading....</div>
      ) : images.length > 1 ? (
        <>
          <ImagesPanel images={images}></ImagesPanel>
          <div class="load-more-block">
            {areMoreIMagesLoading ? (
              "Loading More Images..."
            ) : !showingRandom && currentPage == totalPages ? null : (
              <button onClick={() => loadMore(currentPage + 1)}>
                Load More
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="placeholder">Oops! No Images Found.</div>
      )}
      <Route
        path="/:photoId"
        render={(props) => <DetailedView {...props}></DetailedView>}
      ></Route>
    </main>
  );
}

export default memo(ImageSearchPage);
