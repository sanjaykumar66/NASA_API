import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom';
import Home from './Layouts/Home';

class App extends Component {  
  render() {
    return (  
    <Router > 
      <Switch>  
        <Route exact path="/">
          <Redirect to="/page/0"/>
        </Route>
          <Route  path='/page/:page' component={Home} />
        
      </Switch>
        </Router>)
}
}

export default App;