import React, {Component} from 'react';
import Axios from 'axios';
import Order from './order';
import Delivery from './delivery';

export default class Shoppinglist extends Component{
    state = {
        pendingOrders: [],
        deliveredOrders: [],
        ingredientList: []
    }

    removeOrder(id) {
        newOrders = this.state.pendingOrders.filter(
            (item) => item.id !==id
        );
        this.setState({
            pendingOrders: newOrders
        });
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
        <li key={order.id}><Order remove={this.removeOrder} order={order} username={this.props.username}/></li>
        );
        const deliveredOrdersList = this.state.deliveredOrders.map((order) =>
        <li key={order.id}><Delivery order={order} username={this.props.username}/></li>
        );
        const ingredientList = this.state.ingredientList.map((ingredient) =>
            <li key={ingredient.id}>{ingredient.text}</li>
        );
        
        
        
        return(
            <>
            <h1>Shopping List</h1>
            {ingredientList}
            Recipe Orders:
            {pendingOrdersList}
            Past Deliveries
            {deliveredOrdersList}
            </>
        );
    }
}