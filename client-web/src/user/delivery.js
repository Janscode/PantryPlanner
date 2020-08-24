import React from 'react';
import Recipe from './recipe';

export default function Delivery(props) {
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