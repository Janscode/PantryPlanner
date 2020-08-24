import React, {Component} from 'react';
import Axios from 'axios';
import Order from './order';
import Delivery from './delivery';
import { Box } from '@material-ui/core';
import List from "../ListComponent";

export default class Shoppinglist extends Component{
    state = {
        pendingOrders: [],
        deliveredOrders: [],
        ingredientList: []
    }

    removeOrder = (id) => {
        var newOrders = this.state.pendingOrders.filter(
            (order) => order.id !==id
        );
        var newIngredients = this.state.ingredientList.filter(
            (ingredient) => ingredient.orderId !== id
        );
        this.setState({
            pendingOrders: newOrders,
            ingredientList: newIngredients
        });
    }
    
    addOrder = (id, recipe) => {
        var newOrders = this.state.pendingOrders.concat(
            {id: id, recipe: recipe}
        );
        this.setState({
            pendingOrdersList: newOrders
        });
    }

    componentDidMount() {
        console.log("Made it")
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
        const pendingRow = (items) => ({index}) => {
            const order = items[index];
            return(<Order key={order.id} remove={this.removeOrder} order={order} username={this.props.username}/>);
        };

        const deliveredRow  = (items) => ({index}) => {
            const order = items[index];
            return(<Delivery key={order.id} order={order} add={this.addOrder} username={this.props.username} />);
        };

        const ingredientRow = (items) => ({index, style}) => {
            const ingredient = items[index];
            return (
            <div style={{height:60, fontSize:"120%"}}>
                <li key={items[index].orderId + "/" + items[index].id}>{items[index].text}</li>
            </div>
            );
        }
            
        
        
        
        return(
            <div style={{width:"100%"}}>
                <Box display="flex" flexDirection="row">
                    <Box flexGrow={3}>
                        <List
                         items={this.state.ingredientList}
                         rowComponent={ingredientRow} 
                         height={500}
                         width={500}/>
                        
                    </Box>
                    <Box flexGrow={2} display="flex" flexDirection="column">
                        <h2>Current Orders</h2>
                        <List 
                         items={this.state.pendingOrders}
                         rowComponent={pendingRow}
                         height={300}
                         width={300}
                          />
                        <h2>Past Orders</h2>
                        <List 
                         items={this.state.deliveredOrders}
                         rowComponent={deliveredRow}
                         height={300}
                         width={300}
                          />
                    </Box>
                </Box>
            </div>
        );
    }
}