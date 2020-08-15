import React, { memo } from "react";
import "./style.scss";
function Pagination({ currentPage, totalPages, changePage }) {
  return (
    <div class="page-stepper">
      <button
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        Previous
      </button>
      {`Page ${currentPage} of ${totalPages}`}
      <button
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
export default memo(Pagination);
