//  React
import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
//import NavStd from '../nav/NavStd';
import PropTypes from 'prop-types';
//  REDUX
import { connect } from 'react-redux';
import { setAlert } from '../Notify/rdx_axn/axn_alert';
import { register } from './rdx_axn/axn_auth';

import Btn_Login from './btn/btn_Login';

const Register = ({ setAlert, register }) => {
  //  useState(formData)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    pwConfirm: ''
  });
  //  formData (declare)
  const { username, email, password, pwConfirm } = formData;
  //  formData (change)
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  //  formData (submit)
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== pwConfirm) {
      // destructured props.setAlert
      setAlert("oh no... passwords don't match", 'warn');
    } else {
      register({ username, email, password });
    }
  };
  //  Redirect (auth?)
  /*if (isAuthenticated) {
    return <Redirect to='/profile' />;
  }
  */
  //  Redirect (!auth)
  return (
    <Fragment>
      <section className='theme dark hello center'>
        <div className='greeting center'>
          <h2 className='msg center'>glad You could make it</h2>
        </div>
        <form className='form-auth center' onSubmit={e => onSubmit(e)}>
          <div className='column form-group'>
            <div className='center form-field'>
              <input
                name='username'
                type='text'
                value={username}
                placeholder='username'
                className='center input'
                onChange={e => onChange(e)}
              />
            </div>
            <div className='center form-field'>
              <input
                name='email'
                type='email'
                value={email}
                placeholder='email'
                className='center input'
                onChange={e => onChange(e)}
              />
            </div>
            <div className='center form-field'>
              <input
                name='password'
                type='password'
                value={password}
                placeholder='password'
                className='center input'
                onChange={e => onChange(e)}
              />
            </div>
            <div className='center form-field'>
              <input
                name='pwConfirm'
                type='password'
                value={pwConfirm}
                placeholder='...confirm'
                className='center input'
                onChange={e => onChange(e)}
              />
            </div>
            <div className='options'>
              <div className='center'>
                <input type='submit' value='go' className='btn submit light' />
              </div>
              <Btn_Login />
            </div>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

//  Prop Types
//  snip: <ptfr> 'func prop type required'
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
  // isAuthenticated: PropTypes.bool
};

//  Map State to Props
const mapStateToProps = state => ({
  //isAuthenticated: state.auth.isAuthenticated
});

//  Connect Actions (state, {axn,..}) to Component (Register) to REDUX
export default connect(mapStateToProps, { setAlert, register })(Register);