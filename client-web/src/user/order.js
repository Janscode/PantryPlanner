import React from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';

export default function Order(props) {
    const cancelOrder = () => {
        var formBody = new FormData();
        formBody.append("id", props.order.id);
        Axios({
            method: "POST",
            url: "/api/cancelOrder",
            data: formBody,
            headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(
            (response) => console.log(response)
        )
        .catch(
            (error) => console.log(error)
        );
        props.remove();
    }
    return(
        <div>
            {props.order.recipe.name} <Button onClick={orderOrder}> Cancel Order </Button>
        </div>
    );
}