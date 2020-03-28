import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App.js';




const Total = ({ course }) => {
  const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return(
    <p>Number of exercises {sum}</p>
  ) 
}






ReactDOM.render(<App />, document.getElementById('root'))