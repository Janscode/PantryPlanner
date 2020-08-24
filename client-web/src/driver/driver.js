import React, {Component} from 'react';
import Login from '../login';
import Hub from './hub';

export default class driver extends Component {
    state = {
        page: "login"
    }

    login = (name) => {
        this.setState({
            page: "hub",
            driver: name
        });
    }

    logout = () => {
        this.setState({
            page: "login",
            driver: null
        });
        this.props.logout();
    }
    render(){
        let page = null;
        switch(this.state.page){
            case "login":
               page = <Login login={this.login}/>;
               break; 
            default:
                page = <Hub logout={this.logout} name={this.state.driver}/>
        }
        return(
            page
        );
    }
}