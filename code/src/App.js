import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Obesity Prevalence Exercise</h1>
          <a href="https://github.com/Nanjaa/Obesity-Prevalence-Exercise" target="_blank">Github</a>
        </div>

        <div className="content">
          <p>Graphs Here!</p>
        </div>

        <div className="App-footer">
          <p>Stephanie Olfert</p>
          <p className="inline">
            605.228.3072 | <a className="inline" href="mailto:Stephanie.r.olfert@gmail.com">Stephanie.R.Olfert@gmail.com</a> | <a className="inline" href="https://github.com/Nanjaa">Stephanie's Github</a>
          </p>
          
          
        </div>
      </div>
    );
  }
}

export default App;
