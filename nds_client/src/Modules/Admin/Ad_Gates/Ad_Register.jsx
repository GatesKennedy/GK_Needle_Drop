//  React
import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
//  REDUX
import { connect } from 'react-redux';
import { register } from '../../User/rdx_axn/axn_auth';
//  Comps
import { setAlert } from '../../Notify/rdx_axn/axn_alert';

const Register = ({ setAlert, register, isAuthenticated }) => {
  //  useState(formData)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    password: '',
    pwConfirm: ''
  });
  //  formData (declare)
  const { username, email, role, password, pwConfirm } = formData;
  //  formData (change)
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //  formData (submit)
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== pwConfirm) {
      setAlert("oh no... passwords don't match", 'warn');
    } else if (role != ('admin' || 'dev' || 'user')) {
      setAlert(
        'Go Away Go Away Go Away Go Away Go Away Go Away Go Away Go Away Go Away Go Away',
        'warn'
      );
    } else {
      setAlert('Yeah, you can hang...', 'warn');
      register({ username, email, password, role });
    }
  };
  //  Redirect (auth?)
  if (isAuthenticated) {
    //getCurrentProfile();
    return <Redirect to='/library' />;
  }

  //  Redirect (!auth)
  return (
    <Fragment>
      <section className=' hello center'>
        <div className='greeting center'>
          <h2 className='font-blk center'>hmm, maybe you can hang...</h2>
        </div>
        <form className='form-auth center' onSubmit={e => onSubmit(e)}>
          <div className='column form-group'>
            <div className='center form-field'>
              <input
                name='username'
                type='text'
                value={username}
                placeholder='admin username'
                className='center input'
                onChange={e => onChange(e)}
              />
            </div>
            <div className='center form-field'>
              <input
                name='email'
                type='email'
                value={email}
                placeholder='admin email'
                className='center input'
                onChange={e => onChange(e)}
              />
            </div>
            <div className='center form-field'>
              <input
                name='role'
                type='role'
                value={role}
                placeholder='role: user admin dev'
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
            </div>
          </div>
        </form>
      </section>
      <section className='center'>
        <Link to='/login'>Login</Link>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  setAlert,
  register
})(Register);
