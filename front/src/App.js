import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './components/navbar.component';
import Main from './components/main.component';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={Main} />
        <footer>
          <p>Melvin Toni Gustave</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
