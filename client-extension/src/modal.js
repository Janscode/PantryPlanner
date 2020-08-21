import React, { Component } from "react";
import RecipeView from "./recipe";

export default class Modal extends Component {
  render() {
    const recipe = this.props.recipe;
    if (recipe != null){
        return (
            <div className="modal">
               <div className="modal_content">
                   <RecipeView toggle={this.props.toggle} recipe={recipe}/>
               </div>
          </div>
        );
    }
    else
    {
        return(
            <div className="modal">
               <div className="modal_content">
                   <h1> No recipe found</h1>
                   <button onClick={() => this.props.toggle()}>exit</button>
               </div>
          </div>
        );
    }
 }
}