import React from 'react';
import Recipe from './recipe';
import { Button, Box } from '@material-ui/core';
import Axios from 'axios';

export default function Delivery(props) {
    const order = props.order;

    const orderRecipe = () => {
        var formBody = new FormData();
        formBody.append('username', order.username);
        formBody.append('id', order.recipe.id);
        Axios({
            method: "POST",
            url: '/api/orderRecipe',
            data: formBody,
            headers: {'Content-Type': 'multipart/form-data' } 
        });
        props.add(order.id, order.recipe);
    };

    return(
        <Box display="flex" flexDirection="row" bgcolor={props.color}>
            <Box flexGrow={1}>
                <div style={{fontSize:"small"}}>{order.driver + " delivered:"}</div>
                <div style={{fontSize:"120%"}}>{order.recipe.name}</div>
            </Box>
            <Box >
                <Button onClick={orderRecipe}>
                    Order Again
                </Button>
            </Box>
        </Box>
    )
}