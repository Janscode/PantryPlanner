/*global chrome*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Recipe from './recipe'
import Login from './login'
import { Button } from '@material-ui/core';

export default class App extends React.Component {
  state = {
    page: "login"
  }

  componentDidMount(){
    console.log("In mount");
    chrome.storage.sync.get(["username"], (result) => this.login(result.username));
  }

  login = (username) => {
    if (username != null){
      this.setState({
        page: "home",
        username: username
      });
     
      console.log(username);
    }
    else{
      console.log("Null");
    }
  }

  logout = () => {
    console.log("HOwww?")
    chrome.storage.sync.set({"username": null}, () => console.log("logged out"));
    this.setState({
      username: null,
      page: 'login'
    });
  } 

  exitRecipe = () => {
    this.setState({
      page: "home" 
    });
  }

  extractRecipe= () => {
    this.setState({
      page: "recipe"
    });
  }

  render(){
    let page = null;
    switch (this.state.page){
      case "login":
        page = <Login login={this.login}/>;
        break;
      case "recipe":
        page = <Recipe toggle={this.exitRecipe} username={this.state.username}/>;
        break;
      case "home":
        page = 
        <div>
          <Button onClick={this.extractRecipe} color='primary'>Extract Recipe</Button>
          <Button onClick={this.logout} color='secondary'>loggout</Button>
        </div>;
        break;
    }
    return(page);
  }  
}
