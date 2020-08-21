import React, {Component} from 'react';
import axios from 'axios';

export default class RecipeView extends Component {
    /*saveRecipe = () => {
        axios.put("/saveRecipe", this.props.recipe);
        this.props.toggle()
    }*/

    render() {
        const recipe = this.props.recipe;
        const ingredientList = recipe.recipeIngredient.map((ingredient) => 
            <li>{ingredient}</li>
        );
        return (
            <div>
                <h1>{recipe.name}</h1>
                    <ul>{ingredientList}</ul>
                <button onClick={this.props.toggle}>Save Recipe</button> <button color="red" onClick={this.props.toggle}>exit</button>
            </div>
        );
    }
}
