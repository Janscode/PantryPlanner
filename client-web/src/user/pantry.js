import React, {Component} from 'react';
import Axios from 'axios';

export default class Pantry extends Component{
    componentDidMount() {
        formBody = new FormData();

        Axios(
            this.props.username
        )
        .then((response) => {
            console.log(response)
        });
        .catch((error) =>{
            console.log(error)
        });
    }
    render(){
        return(
            <h1>this is a Pantry</h1>
        );
    }
}