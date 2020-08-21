import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Driver from './driver/driver';
import User from './user/user';



export default class App extends Component {
  state = {
    isDriver: false,
    isUser: false,
  };

  driverClick = () => {
    this.setState({
      isDriver: true
    });
  }

  userClick = () => {
    this.setState({
      isUser: true
    });
  }

  logout = () => {
    this.setState({
      isDriver: false,
      isUser: false
    });
  };


  render() {
    if (this.state.isDriver) {
      return(
      <Driver logout={this.logout}/>
      );
    }
    else if (this.state.isUser){
      return(
      <User logout={this.logout}/>
      );
    }
    else {
      return(
      <div>
        <Button onClick={this.userClick}>User</Button> <Button onClick={this.driverClick}>Driver</Button>
      </div>
      );
      }
  }
}
