import React from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';

export default function Order(props) {
    const cancelOrder = () => {
        const id = props.order.id;
        var formBody = new FormData();
        formBody.append("id", id);
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
        props.remove(id)
    }
    return(
        <div>
            {props.order.recipe.name} <Button onClick={cancelOrder}> Cancel Order </Button>
        </div>
    );
}