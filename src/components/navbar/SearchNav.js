import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from '../search/SearchBar';

class SearchNav extends Component {
  state = { query: '' };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  redirectToSearch = (e) => {
    e.preventDefault();
    const { history, toggleSidebar } = this.props;
    const { query } = this.state;
    // Set query & sort by date by default
    const location = {
      pathname: '/search',
      search: query !== '' ? `?q=${encodeURIComponent(query)}&sortBy=date` : '',
      state: {
        requestFromNav: true,
      },
    };

    history.push(location);
    this.setState({ query: '' });
    toggleSidebar(false);
  }

  render() {
    const { query } = this.state;
    return (
      <form onSubmit={this.redirectToSearch}>
        <SearchBar parent="nav" query={query} onChange={this.handleInputChange} />
      </form>
    );
  }
}

SearchNav.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default withRouter(SearchNav);
