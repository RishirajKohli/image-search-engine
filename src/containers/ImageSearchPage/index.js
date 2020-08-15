import React, { memo, useState, useCallback, useEffect } from "react";
import Unsplash from "unsplash-js";
import { Route } from "react-router-dom";
import ImagesPanel from "../../components/ImagesPanel";
import Pagination from "../../components/Pagination";
import DetailedView from "../../components/DetailedView";
import "./style.scss";

export const unsplash = new Unsplash({
  accessKey: "JKtfowv6i-uF34qRztTVR4FwBUyLf1RJO_vn13tF_74",
});

function ImageSearchPage() {
  const [searchString, setSearchString] = useState("");
  const [areImagesLoading, setAreImagesLoading] = useState(false);
  const [images, setImages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  useEffect(() => {
    if (areImagesLoading) {
      unsplash.search
        .photos(searchString, currentPage, 9, { orientation: "portrait" })
        .then((response) => response.json())
        .then((res) => {
          setAreImagesLoading(false);

          setImages(res.results);
          setTotalPages(res.total_pages);
        })
        .catch((err) => {
          console.error(err);
          setAreImagesLoading(false);
          setImages([]);
        });
    }
  }, [areImagesLoading, searchString, currentPage]);

  const handleInputChange = useCallback((event) => {
    setSearchString(event.target.value);
  }, []);
  const handleSearch = useCallback(
    (event) => {
      event.preventDefault();
      if (searchString) {
        setAreImagesLoading(true);
      }
    },
    [searchString]
  );
  const changePage = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    setAreImagesLoading(true);
  }, []);

  return (
    <main className="main-block">
      <form onSubmit={handleSearch} className="search-box">
        <input value={searchString} onChange={handleInputChange}></input>
        <button type="submit">Search</button>
      </form>
      {areImagesLoading ? (
        <div className="placeholder"> Loading....</div>
      ) : images === null ? (
        <div className="placeholder">
          <h3>Search for your favourite photos!!</h3>
        </div>
      ) : images.length > 1 ? (
        <>
          <ImagesPanel images={images}></ImagesPanel>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            changePage={changePage}
          ></Pagination>
        </>
      ) : (
        "No Images found"
      )}
      <Route
        path="/:photoId"
        render={(props) => <DetailedView {...props}></DetailedView>}
      ></Route>
    </main>
  );
}

export default memo(ImageSearchPage);
