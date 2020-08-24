import React, {Component} from 'react';
import Login from '../login'
import Cookbook from './cookbook'
import Sidebar from '../sidebar'
import Shoppinglist from './shoppinglist'


export default class User extends Component {
    state = {
        name: '',
        page: 'login'
    }
    
    login = (name) => {
        this.setState({
            name: name,
            page: 'shoppingList'
        });
    }

    logout = () => {
        this.setState({
            name: '',
            page: 'login'
        });
        this.props.logout();
    }

    getCookbook = () =>{
        this.setState({
            page: "cookbook"
        })
    }

    getShoppinglist = () =>{
        this.setState({
            page: "shoppingList"
        })
    }
    
    render(){
        let page = null;
        let name = '';
        switch(this.state.page){
            case "login":
                return(
                    <Login login={this.login}/>
                );
            case "shoppingList":
                page = <Shoppinglist username={this.state.name}/> ;
                name = "Shopping List";
                break;
            case "cookbook":
                page = <Cookbook username={this.state.name}/>;
                name = "Cookbook";
                break;
            default:
                break;
        }

        const buttons = [
            {text: "Shopping List", click: this.getShoppinglist},
            {text: "Cookbook", click: this.getCookbook},
            {text: "Log out", click: this.logout}
        ]
        return(
            <>
            <Sidebar name={name} buttons={buttons} content={page} />
            </>
        );
    }  
}
