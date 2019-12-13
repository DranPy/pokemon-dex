import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import store from 'store'
import Main from 'pages/Main'

import 'assets/stylesheets/application.sass'

const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route component={Main} exact path="/" />
      </Switch>
    </Router>
  </Provider>
)

export default App
