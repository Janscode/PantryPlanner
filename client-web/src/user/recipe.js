import React, {Component} from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button'

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
                {recipe.name} <Button onClick={this.orderRecipe}>{this.props.orderText}</Button>
            </div>
        );
    }
}