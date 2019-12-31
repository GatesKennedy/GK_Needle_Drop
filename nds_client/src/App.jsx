import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// === REDUX ===
import { Provider } from 'react-redux';
import store from './util/store';
import { loadUser } from './Rdx_actions/axn_auth';
//import setAuthToken from './util/setAuthToken';

// === Style ===
import './sass/App.scss';
// === comps ===
//    === Admin ===
//    === Ecomm ===
import Checkout from './components/Ecomm/Checkout';
//    === Library ===
import Library from './components/Library/Library';
//    === Main ===
import Hello from './components/Main/Hello';
import NavStd from './components/Main/NavStd';
//    === Notify ===
import Alert from './components/Notify/Alert';
//    === User ===
import User from './components/User/User';


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
            <h1>Needle Drop</h1>
            <section className='container fill-window'>
            <Route exact path='/' component={Library} />
            <Switch>
              <Route exact path='/hello' component={Hello} />
              <Route exact path='/library' component={Library} />
              <Route exact path='/user' component={User} />
              <Route exact path='/ecomm' component={Checkout}/>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>

  );
}

export default App;
