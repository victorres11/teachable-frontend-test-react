'use strict';
import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import GemSearchContainer from './components/GemSearchContainer';
import GemFavoritesContainer from './components/GemFavoritesContainer';
import MainContainer from './components/MainContainer';
// import {  Route, Router, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import { BrowserRouter, Router, Route, Switch, Link } from 'react-router-dom'


class App extends Component {
    render() {

        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={() => (<MainContainer favorites="false" />)} />
                    <Route path="/foobar" component={() => (<MainContainer favorites="true" />)} />
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('main')
);
