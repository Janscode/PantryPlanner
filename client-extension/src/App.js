/*global chrome*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './modal'

export default class App extends React.Component {
  state = {
    seen: false,
    recipe: null
  };

  updateRecipe = (recipe) => {
    console.log(recipe);
    this.setState({
      recipe: recipe
    });
  };

  loadRecipe = () => {
    chrome.tabs.executeScript({file : "/content.js"});
    chrome.runtime.onMessage.addListener(this.updateRecipe);
    this.setState({
      seen: true
    });

  };

  toggleModal = () => {
    this.setState({
      seen: !this.state.seen
    });
  };

  render(){
    return(
    <div className="App">
      <div className="btn" onClick={this.loadRecipe}>
      </div>
      {this.state.seen ? <Modal toggle={this.toggleModal} recipe={this.state.recipe} /> :
      <button onClick={this.loadRecipe}>
      Extract Recipe
      </button>}
    </div>
  );
  }  
}
