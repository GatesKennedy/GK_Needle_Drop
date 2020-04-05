import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// === REDUX ===
import { Provider } from 'react-redux';
import store from './Main/util/store';
import { loadUser } from './Modules/User/rdx_axn/axn_auth';
import setAuthToken from './Main/util/setAuthToken';

// === Style ===
import './sass/App.scss';
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';

// === comps ===
//    === Main ===
import Hello from './Main/Hello';
import NavStd from './Main/Navi';
//    === Admin ===
import Ad_Gate from './Modules/Admin/Ad_Gates/Ad_Gate';
import Ad_Register from './Modules/Admin/Ad_Gates/Ad_Register';
import Ad_Login from './Modules/Admin/Ad_Gates/Ad_Login';
import Ad_Playlist from './Modules/Admin/Ad_PlayList';
import Ad_Library from './Modules/Admin/Ad_Library';
import Ad_Strapi from './Modules/Admin/Ad_Strapi';
import Ad_Account from './Modules/Admin/Ad_Account';
//    === Ecomm ===
import Purchase from './Modules/Ecomm/Purchase';
//    === Library ===
import Library from './Modules/Library/Library';
import Artist from './Modules/Library/Artist';
import PlaylistAll from './Modules/Library/PlaylistAll';
//    === NDS ===
import Footer from './Modules/NDS/Footer';
//    === Notify ===
import Alert from './Modules/Notify/Alert';
//    === User ===
import Profile from './Modules/User/Profile';
import User from './Modules/User/User';
import Login from './Modules/User/Login';
import Register from './Modules/User/Register';

//  Set Headers with 'x-auth-token': 'token'
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  //  axn_auth/loadUser()
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alert />
          <NavStd />
          <section className='container fill-window'>
            <Route exact path='/' component={Library} />
            <Switch>
              <Route exact path='/hello' component={Hello} />
              <Route exact path='/library' component={Library} />
              <Route exact path='/playlists' component={PlaylistAll} />
              <Route exact path='/artist' component={Artist} />
              <Route exact path='/user' component={User} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/purchase' component={Purchase} />

              <Route
                exact
                path='/blckknght/fornownotever'
                component={Ad_Gate}
              />
              <Route
                exact
                path='/blckknght/fornownotever/register'
                component={Ad_Register}
              />
              <Route
                exact
                path='/blckknght/fornownotever/login'
                component={Ad_Login}
              />
              <Route exact path='/blckknght/strapi' component={Ad_Strapi} />
              <Route exact path='/blckknght/playlist' component={Ad_Playlist} />
              <Route exact path='/blckknght/library' component={Ad_Library} />
              <Route exact path='/blckknght/account' component={Ad_Account} />
            </Switch>
          </section>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
