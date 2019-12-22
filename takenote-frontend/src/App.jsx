import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RegisterScreen from './pages/RegisterScreen';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/register" component={RegisterScreen}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}
