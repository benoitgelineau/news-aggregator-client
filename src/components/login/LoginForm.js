/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logIn, signUp, setErrorMessage } from '../../actions/userActions';

import Username from './Username';
import Password from './Password';

import styles from '../../styles/login/LoginForm.scss';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    loading: false,
  };

  componentDidUpdate() {
    const { error, isRegister, isAuthenticate, logIn } = this.props;
    // Log in when user has successfully signed up
    if (!error && isRegister && !isAuthenticate) {
      const { username, password } = this.state;
      logIn({ username, password });
    }
  }

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { logAction, logIn, signUp, setErrorMessage } = this.props;

    if (password.length < 6) {
      setErrorMessage('Password must contain at least 6 characters');
    } else {
      this.setState({ loading: true }, () => (
        logAction === 'login' ? (
          logIn({ username, password })
        ) : (
          signUp({ username, password })
        )
      ));
    }
  }

  render() {
    const { username, password, loading } = this.state;
    const { isAuthenticate, error, logAction } = this.props;
    const isLoading = !isAuthenticate && !error && loading;
    const btnAction = logAction === 'login' ? 'Login' : 'Create account';

    return (
      <form className={styles.loginForm} onSubmit={this.onSubmit}>
        <Username value={username} onChange={this.handleChangeInput} />
        <Password value={password} onChange={this.handleChangeInput} />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading' : btnAction}
        </button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  isAuthenticate: PropTypes.bool.isRequired,
  isRegister: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  logAction: PropTypes.string.isRequired,
  logIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticate: state.user.isAuthenticate,
  isRegister: state.user.isRegister,
  error: state.user.error,
});

export default connect(mapStateToProps, { logIn, signUp, setErrorMessage })(LoginForm);
