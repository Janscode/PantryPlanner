import React from 'react';
import Recipe from './recipe';

export default function Delivery(props) {
    const order = props.order;
    return(
        <>
        <Recipe 
        recipe={{
            name: order.name, 
            recipeIngredient: order.recipeIngredient}}
        username={this.props.username} 
        ordertext="order again" 
        key={recipe.id}
        />
        </>
    )
}