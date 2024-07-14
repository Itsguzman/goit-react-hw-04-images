import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './load.module.css';

class LoadMore extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className={css.divButtonx}>
        <button className={css.buttonx} onClick={this.props.onClick}>
          LOAD MORE
        </button>
      </div>
    );
  }
}

export default LoadMore;
