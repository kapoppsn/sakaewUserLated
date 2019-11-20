import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';
import Login from './components/Login';
import LoginPage from './components/LoginPage';
import Profile from './components/Profile';
import UploadReceipt from './components/UploadReceipt';
import OnlyHistory from './components/OnlyHistory';

ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={LoginPage} />
        <Route path='/history' component={App}/>
        <Route path='/historyonly' component={OnlyHistory}/>
        <Route path='/edit/:id' component={Edit} />
        <Route path='/create' component={Create} />
        <Route path='/show/:id' component={Show} />
        <Route path='/profile' component={Profile} />
        <Route path='/upreceipt/:id' component={UploadReceipt} />
      </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();