import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import Navbar from './components/navbar.component';
import ExercisesList from './components/exercises-list.component'; 
import CreateExercise from './components/create-exercise.component'; 

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ExercisesList} />
        <Route path="/create" component={CreateExercise} />
      </div>
    </Router>
  );
}

export default App;
