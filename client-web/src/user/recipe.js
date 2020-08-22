import React, {Componen, Component} from 'react';
import Axios from 'axios';

export default class Recipe extends Component{
    orderRecipe = () => {
        var formBody = new FormData();
        formBody.append('username', this.props.username);
        formBody.append('recipe', this.props.recipe.name);
        Axios({
            method: "POST",
            url: '/api/orderRecipe',
            data: formBody,
            headers: {'Content-Type': 'multipart/form-data' } 
        });
    }

    render() {
        const recipe = this.props.recipe;

        return(
            <div>
                <h1> {recipe.name} </h1>
                <button onClick={this.orderRecipe}>order</button>
            </div>
        );
    }
}