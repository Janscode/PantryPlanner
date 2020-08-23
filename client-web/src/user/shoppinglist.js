import React, {Component} from 'react';
import Order from './order'
import Axios from 'axios';

export default class Shoppinglist extends Component{
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
            this.setState({
                ordersPending: response.ordersPending,
                ordersDelivered: response.ordersDelivered
            });
        })
        .catch((error) =>{
            console.log(error)
        });
    }
    render(){
        const ordersPendingList = this.state.ordersPending.map((order) =>
            <li><Order order={order}/></li>
        )
        return(
            <h1>this is a Pantry </h1>

        );
    }
}