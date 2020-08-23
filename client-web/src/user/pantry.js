import React, {Component} from 'react';
import Axios from 'axios';

export default class Pantry extends Component{
    state = {}
    componentDidMount() {
        var formBody = new FormData();
        formBody.append("username", this.props.username);
        Axios({
            method: "POST",
            url: "/api/getOrderList",
            data: formBody,
            headers: {'Content-Type': 'multipart/form-data' }
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) =>{
            console.log(error)
        });
    }
    render(){
        return(
            <h1>this is a Pantry </h1>

        );
    }
}