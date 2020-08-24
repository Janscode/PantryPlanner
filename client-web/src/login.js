import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class Login extends Component {
    state = {
        name:''
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value });
    }
    
    login = () => {
        const name = this.state.name;
        this.props.login(name);
    }

    render() {
        return(
            <>
            <TextField 
            id="user input"
            label="Username"
            value={this.state.name}
            onChange={this.handleChange('name')}
            />

            <Button onClick={this.login}>Login</Button>
            </>
        );
    }

}