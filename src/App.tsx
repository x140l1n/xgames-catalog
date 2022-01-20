import Navigation from './components/Navigation';
import Games from './pages/Games';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Details from './pages/Details';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import React from 'react';

const api_key: string = "8d55cd34a151453f973a0ecaa163e9ad";

const App = (): JSX.Element => {
  return (
    <Router>
      <React.Fragment>
        <Navigation title="Games catalog" logo={require('./assets/img/logo.png')} />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/games/:platform/:id" render={(props) => (<Details key={props.match.params.id} {...props} apiKey={api_key} />)} />
          <Route path="/games/:platform" render={(props) => (<Games key={props.match.params.platform} {...props} apiKey={api_key} />)} />
          <Route path="*"><NotFound /></Route>
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
