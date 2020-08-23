import React, {Component} from 'react';
import Order from './order'
import Axios from 'axios';

export default class Shoppinglist extends Component{
    state = {
        pendingOrders: [],
        deliveredOrders: [],
        ingredientList: []
    }
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
            this.setState({
                pendingOrders: response.data.pendingOrders,
                deliveredOrders: response.data.deliveredOrders,
                ingredientList: response.data.ingredientList
            });
            
        })
        .catch((error) =>{
            console.log(error)
        });
    }
    render(){
        const pendingOrdersList = this.state.pendingOrders.map((order) =>
        <li><Order order={order}/></li>
        );
        
        
        
        return(
            <>
            <h1>this is a Pantry </h1>
            {pendingOrdersList}
            </>
        );
    }
}