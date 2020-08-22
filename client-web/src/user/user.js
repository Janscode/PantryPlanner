import React, {Component} from 'react';
import Menu from './menu'
import Login from './login'
import Cookbook from './cookbook'
import Pantry from './pantry'
import axios from 'axios';

export default class User extends Component {
    state = {
        name: '',
        loggedIn: false,
        cookbook: false,
        pantry: false
    }
    
    login = (name) => {
        this.setState({
            name: name,
            loggedIn: true
        });
    }

    logout = () => {
        this.setState({
            name: '',
            loggedIn: false,
            showCookbook: false,
            showPantry: false,
            cookbookJson: {},
            pantryJson: {}
        });
        this.props.logout();
    }

    receiveCookbook = (response) => {
        this.state.cookbookJson = response.data;
        this.setState({
            cookbookJson: response.data,
            showCookbook: true,
            showPantry: false
        });
    }

    getCookbook = () =>{
        var formBody = new FormData();
        formBody.append("username", this.state.name);
        axios({
            method: 'POST',
            url: '/api/getRecipeList',
            data: formBody,
            headers: {'Content-Type': 'multipart/form-data' }
          })
          .then(this.receiveCookbook)
          .catch(function (response){
              console.log(response);
          });
    }

    receivePantry = (response) => {
        console.log(response);
    } 
    getPantry = () =>{
        this.setState({
            showPantry: true,
            showCookbook: false
        })
    }
    
    render(){
        if (!this.state.loggedIn){
            return(
                <Login login={this.login}/>
            );
        }
        else {
            return(
            <>
            <Menu logout={this.logout} getPantry={this.getPantry} getCookbook={this.getCookbook}/>
            {this.state.showPantry ? <Pantry pantryJson={this.state.pantryJson} username={this.props.name}/> : null}
            {this.state.showCookbook ? <Cookbook cookbookJson={this.state.cookbookJson}  username={this.props.name}/> : null}
            </>
            );
        }  
    }
}