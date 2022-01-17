import Navigation from './components/Navigation';
import Games from './pages/Games';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import React from 'react';


const App = (): JSX.Element => {
  return (
    <Router>
      <React.Fragment>
        <Navigation title="Games catalog" logo={require('./assets/img/logo.png')} />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/games/:platform" render={(props) => (
            <Games key={props.match.params.platform} {...props} />)
          } />
          <Route exact path="*"><NotFound /></Route>
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
