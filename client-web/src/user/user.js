import React, {Component} from 'react';
import Menu from './menu'
import Login from './login'
import Cookbook from './cookbook'
import Pantry from './pantry'
import Axios from 'axios';

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

    getCookbook = () =>{
       this.setState({
           showCookbook: true,
           showPantry: false
       })
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
            {this.state.showPantry ? <Pantry pantryJson={this.state.pantryJson}/> : null}
            {this.state.showCookbook ? <Cookbook pantryJson={this.state.cookbookJson}/> : null}
            </>
            );
        }  
    }
}