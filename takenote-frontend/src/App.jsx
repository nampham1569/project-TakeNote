import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RegisterScreen from './pages/RegisterScreen';
import HomeScreen from "./pages/HomeScreen"
import LoginScreen from './pages/LoginScreen';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={HomeScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/login" component={LoginScreen}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
