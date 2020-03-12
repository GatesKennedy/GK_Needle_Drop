import React, { Fragment, useState } from '../../../node_modules/react';
import { Link, Redirect } from '../../../node_modules/react-router-dom';
//  REDUX
import { connect } from '../../../node_modules/react-redux';
import PropTypes from '../../../node_modules/prop-types';
import { login } from './rdx_axn/axn_auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login({ email, password });
  };

  //  Redirect if User Authenticated
  if (isAuthenticated) {
    return <Redirect to='/library' />;
  }

  return (
    <Fragment>
      <section className='theme dark hello center'>
        <div className='greeting center'>
          <h2 className='font-blk center'>welcome back, Friend</h2>
        </div>
        <form className='center options' onSubmit={e => onSubmit(e)}>
          <div className='col form-group center'>
            <div className='form-field center'>
              <input
                name='email'
                type='text'
                value={email}
                onChange={e => onChange(e)}
                placeholder='email'
                className='center input'
              />
            </div>
            <div className='form-field center'>
              <input
                name='password'
                type='password'
                value={password}
                onChange={e => onChange(e)}
                placeholder='password'
                className='center input'
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
        <Link to='/register'>Register</Link>
      </section>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
