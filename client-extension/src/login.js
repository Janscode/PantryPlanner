/*global chrome*/
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class Login extends Component {
    state = {
        username: ''
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value });
    }
    
    login = () => {
        const username = this.state.username;
        chrome.storage.sync.set({"username":username});
        this.props.login(username);
    }

    render() {
        return(
            <>
            <TextField 
            id="user input"
            label="Username"
            value={this.state.name}
            onChange={this.handleChange('username')}
            />

            <Button onClick={this.login}>Login</Button>
            </>
        );
    }

}