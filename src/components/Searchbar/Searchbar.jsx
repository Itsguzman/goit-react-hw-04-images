import React, { Component } from 'react';
import css from './search.module.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = { query: '' };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <div>
        <header className={css.searchbar}>
          <form className={css.SearchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.SearchFormButton}>
              <span className={css.SearchFormButtonLabel}>Search</span>
            </button>

            <input
              // name="search"
              className={css.SearchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              value={this.state.query}
              onChange={this.handleChange}
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </div>
    );
  }
}

export default Searchbar;
