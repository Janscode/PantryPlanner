import React, {Component} from 'react';
import axios from 'axios';
/*global chrome*/

export default class RecipeView extends Component {
    state = {
        gotRecipe: false
    }
    componentDidMount = () => {
        chrome.tabs.executeScript({file : "/content.js"});
        chrome.runtime.onMessage.addListener(
            (recipe) => {
                if (recipe.recipeIngredient !== null){
                    this.setState({
                        recipe: recipe,
                        gotRecipe: true
                    });
                }
            }
        );
    }

    saveRecipe = () => {
        console.log(this.state.recipe)
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/saveRecipe',
            data: {"username": "placeholer", 'recipe' : this.props.recipe},
            headers: {'Content-Type': 'multipart/form-data'}
        });
        this.props.toggle()
    }

    render() {
        if (!this.state.gotRecipe){
            return(
                <div>
                    <h2>Recipe not found!</h2>
                    <button color="red" onClick={this.props.toggle}>exit</button>
                </div>
            )
        }
        const recipe = this.state.recipe;
        const ingredientList = recipe.recipeIngredient.map((ingredient) => 
            <li>{ingredient}</li>
        );
        return (
            <div>
                <h1>{recipe.name}</h1>
                    <ul>{ingredientList}</ul>
                <button onClick={this.saveRecipe}>Save Recipe</button> 
                <button color="red" onClick={this.props.toggle}>exit</button>
            </div>
        );
    }
}
