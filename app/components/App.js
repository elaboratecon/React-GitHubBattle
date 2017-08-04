// Import React components
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Import custom components
import Nav from './Nav'
import Home from './Home'
import Battle from './Battle'
import Results from './Results'
import Popular from './Popular'

class App extends React.Component {
  render () {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/battle' exact component={Battle} />
            <Route path='/battle/results' component={Results} />
            <Route path='/popular' component={Popular} />
            <Route render={function () {
              return <p>404 Error</p>
            }} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
