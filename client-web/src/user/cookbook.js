import React, {Componen, Component} from 'react';
import Recipe from './recipe'


export default class Cookbook extends Component{
    render(){
        const recipeList = this.props.cookbookJson.recipes.map((recipe) => 
        <Recipe recipe={recipe} username={this.props.username} key={recipe.name}/>
    );
        
        return(
            recipeList
        );
    }
}