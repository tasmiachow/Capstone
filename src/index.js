import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import CreateAccountPage from './views/create-account-page'
import LoginPage from './views/login-page'
import Home from './views/home'
import About from './views/about'
import NotFound from './views/not-found'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route
          component={CreateAccountPage}
          exact
          path="/create-account-page"
        />
        <Route component={LoginPage} exact path="/login-page" />
        <Route component={Home} exact path="/" />
        <Route component={About} exact path="/about" />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
