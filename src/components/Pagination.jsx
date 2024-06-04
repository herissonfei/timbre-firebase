import React from "react";
import linkArrowBlueLeft from "../img/png/icone-link-arrow-blue-left.png";
import linkArrowBlue from "../img/png/icone-link-arrow-blue.png";
import { Link } from "react-router-dom";

export const Pagination = (
  currentPage,
  totalPages,
  onPageChange,
  changeClassz
) => {
  const pageNumbers = [];
  // console.log(1);

  for (let i = 1; i <= currentPage.totalPages; i++) {
    pageNumbers.push(i);
  }
  // console.log(pageNumbers);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= currentPage.totalPages) {
      currentPage.onPageChange(newPage);
    }

    // console.log(currentPage, totalPages, onPageChange);
  };
  return [
    <div
      className={
        currentPage.changeClass === "true"
          ? "menu__nav-page menu__nav-page-wrapper"
          : "menu__nav-page menu__nav-page--var"
      }
    >
      <div
        className={`${currentPage.currentPage === 1 ? "disabled" : ""}`}
        onClick={() => handlePageChange(currentPage.currentPage - 1)}
        disabled={currentPage.currentPage === 1}
      >
        <img width="10" src={linkArrowBlueLeft} alt="fleche dropwdown" />
      </div>

      {pageNumbers.map((pageNumber) => (
        <div
          key={pageNumber}
          className={`pagination-btn ${
            pageNumber === currentPage.currentPage ? "active" : ""
          }`}
          onClick={() => handlePageChange(pageNumber)}
        >
          <Link key={pageNumber}>
            <span>{pageNumber}</span>
          </Link>
        </div>
      ))}
      <div
        className={`${
          currentPage.currentPage === currentPage.totalPages ? "disabled" : ""
        }`}
        onClick={() => handlePageChange(currentPage.currentPage + 1)}
        disabled={currentPage.currentPage === currentPage.totalPages}
      >
        <img width="10" src={linkArrowBlue} alt="fleche dropwdown" />
      </div>
    </div>,
  ];
};
