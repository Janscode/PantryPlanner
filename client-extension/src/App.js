
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Recipe from './recipe'

export default class App extends React.Component {
  state = {
    seen: false
  };

  toggleRecipe = () => {
    this.setState({
      seen: !this.state.seen
    });
  };

  render(){
    return(
    <div className="App">
      <div className="btn" onClick={this.loadRecipe}>
      </div>
      {this.state.seen ? <Recipe toggle={this.toggleRecipe}/> :
      <button onClick={this.toggleRecipe}>
      Extract Recipe
      </button>}
    </div>
  );
  }  
}
