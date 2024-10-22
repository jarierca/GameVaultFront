// src/components/util/Pagination.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/Icon';
import './Pagination.css';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 10;
  const halfVisible = Math.floor(maxVisiblePages / 2);

  let startPage, endPage;

  if (totalPages <= maxVisiblePages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= halfVisible) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage + halfVisible >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfVisible;
      endPage = currentPage + halfVisible;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-container">
      { totalPages > 1 &&
        <ul className="pagination">
          {currentPage > 1 && (
            <li className="page-item">
              <span onClick={() => paginate(1)} className="page-link">
                <Icon iconName="FirstPageIcon" />
              </span>
            </li>
          )}

          {currentPage > 1 && (
            <li className="page-item">
              <span onClick={() => paginate(currentPage - 1)} className="page-link">
                <Icon iconName="LeftArrowIcon" />
              </span>
            </li>
          )}

          {pageNumbers.map((number) => (
            <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
              <span onClick={() => paginate(number)} className="page-link">
                {number}
              </span>
            </li>
          ))}

          {currentPage < totalPages && (
            <li className="page-item">
              <span onClick={() => paginate(currentPage + 1)} className="page-link">
                <Icon iconName="RightArrowIcon" />
              </span>
            </li>
          )}

          {currentPage < totalPages && (
            <li className="page-item">
              <span onClick={() => paginate(totalPages)} className="page-link">
                <Icon iconName="LastPageIcon" />
              </span>
            </li>
          )}
        </ul>
      }
    </nav>
  );
};

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;

