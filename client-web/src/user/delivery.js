import React from 'react';
import Recipe from './recipe';

export default function Delivery(props) {
    const order = props.order;
    return(
        <>
        <Recipe 
        recipe={props.order.recipe} 
        username={props.username} 
        orderText="order again" 
        />
        </>
    )
}