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
        <li key={order.name}><Order order={order} /></li>
        );
        const deliveredOrdersList = this.state.deliveredOrders.map((order) =>
        <li key={order.name}><Order order={order}/></li>
        );
        const ingredientList = this.state.ingredientList.map((ingredient) =>
            <li key={ingredient}>{ingredient}</li>
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