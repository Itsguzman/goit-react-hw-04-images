import React from 'react';
import PropTypes from 'prop-types';
import css from './load.module.css';

const LoadMore = ({ onClick }) => {
  return (
    <div className={css.divButtonx}>
      <button className={css.buttonx} onClick={onClick}>
        LOAD MORE
      </button>
    </div>
  );
};

LoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMore;
