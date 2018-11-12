import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toggleSidebar } from '../../actions/layoutActions';

import styles from '../../styles/sidebar/Buttons.scss';

// eslint-disable-next-line no-shadow
const Buttons = ({ sidebar, toggleSidebar }) => (
  <div className={styles.buttons} sidebar={`${sidebar}`}>
    <Link to="/bookmarks" className={styles.bookmarks} onClick={() => toggleSidebar(false)}>
      <i className="fas fa-bookmark" />
      <h2>Bookmarks</h2>
    </Link>
  </div>
);

Buttons.defaultProps = {
  sidebar: false,
};

Buttons.propTypes = {
  sidebar: PropTypes.bool,
  toggleSidebar: PropTypes.func.isRequired,
};

export default connect(null, { toggleSidebar })(Buttons);
