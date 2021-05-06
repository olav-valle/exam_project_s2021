import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ItemGrid } from './features/items/ItemGridComp';


function App() {
  // for testing only
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <ItemGrid />
        </Route>
      </Router>
    </div>
  );
}

export default App;