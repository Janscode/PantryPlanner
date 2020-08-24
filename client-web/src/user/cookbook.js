import React, {Component} from 'react';
import Recipe from './recipeCard';
import Axios from 'axios';


export default class Cookbook extends Component{
    state ={
        recipes: []
    }
    componentDidMount(){
        var formBody = new FormData();
        formBody.append("username", this.props.username);
        Axios({
            method: 'POST',
            url: '/api/getRecipeList',
            data: formBody,
            headers: {'Content-Type': 'multipart/form-data' }
          })
          .then(
              (response) => {this.setState({
                  recipes: response.data.recipes
              });
            }
          )
          .catch(function (response){
              console.log(response);
          });
    }
    render(){
        const recipeList = this.state.recipes.map((recipe) => 
        <Recipe 
        recipe={recipe} 
        username={this.props.username} 
        key={recipe.id} 
        orderText="order"
        />
    );
        
        return(
            <>
            <h1>Your Recipes:</h1>
            {recipeList}
            </>
        );
    }
}