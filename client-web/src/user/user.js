import React, {Component} from 'react';
import Menu from './menu'
import Login from './login'
import Cookbook from './cookbook'
import Shoppinglist from './shoppinglist'
import axios from 'axios';

export default class User extends Component {
    state = {
        name: '',
        loggedIn: false,
        showCookbook: false,
        showShoppinglist: false
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
            showShoppinglist: false,
        });
        this.props.logout();
    }

    receiveCookbook = (response) => {
        this.setState({
            cookbookJson: response.data,
            showCookbook: true,
            showShoppinglist: false
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

    receiveShoppinglist = (response) => {
        console.log(response);
    } 
    getShoppinglist = () =>{
        this.setState({
            showShoppinglist: true,
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
            <Menu logout={this.logout} getShoppinglist={this.getShoppinglist} getCookbook={this.getCookbook}/>
            {this.state.showShoppinglist ? <Shoppinglist username={this.state.name}/> : null}
            {this.state.showCookbook ? <Cookbook cookbookJson={this.state.cookbookJson}  username={this.state.name}/> : null}
            </>
            );
        }  
    }
}