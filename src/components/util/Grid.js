// src/components/util/Grid.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './Grid.css';

const Grid = ({ children }) => {
  return <div className="grid">{children}</div>;
};

Grid.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Grid;

