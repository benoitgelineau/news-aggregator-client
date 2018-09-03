import React, { Component } from 'react';
import Topics from './Topics';
import Buttons from './Buttons';
import styles from '../../styles/sidebar/Sidebar.scss';


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  toggleSidebar = e => { // Use Redux (to toggle from Navbar also)
    e.preventDefault();

    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    const { isOpen } = this.state;

    return (
      <div className={isOpen ? styles.sidebarOpen : styles.sidebar}>
        <div className={styles.sidebar__list}>
          <Topics />
          <Buttons />
          {/*<Buttons bookmarks={bookmarks} onDrop={this.handleDrop}/>*/}
        </div>
        <div className={styles.sidebar__clickCatcher} onClick={this.toggleSidebar}></div>
      </div>
    );
  }
}

export default Sidebar;