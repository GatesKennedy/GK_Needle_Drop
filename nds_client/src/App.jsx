import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// === REDUX ===
import { Provider } from 'react-redux';
import store from './Main/util/store';
import { loadUser } from './Modules/User/rdx_axn/axn_auth';
//import setAuthToken from './util/setAuthToken';

// === Style ===
import './sass/App.scss';
// === comps ===
//    === Admin ===
//    === Ecomm ===
import Purchase from './Modules/Ecomm/Purchase';
//    === Library ===
import Library from './Modules/Library/Library';
import Artist from './Modules/Library/Artist';
import Playlists from './Modules/Library/Collections';
//    === Main ===
import Hello from './Main/Hello';
import NavStd from './Main/Navi';
import Header from './Main/Header';
import Footer from './Main/Footer';
//    === Notify ===
import Alert from './Modules/Notify/Alert';
//    === User ===
import Profile from './Modules/User/Profile';

const App = () => {
  //  Research: React Hooks: useEffect 'infinite loop' , second parameter
  //  https://reactjs.org/docs/hooks-effect.html
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
              <Route exact path='/playlists' component={Playlists} />
              <Route exact path='/artist' component={Artist} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/purchase' component={Purchase} />
            </Switch>
          </section>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
