/*global chrome*/
import React, { useState, useEffect } from 'react'
import axios from 'axios';

function extractRecipe() {
  chrome.tabs.executeScript({file : "/content.js"});
}
function App() {
  return(
    <div className="App">
      <button onClick={() => extractRecipe()}>
        Save Recipe
      </button>
    </div>
  );
};
export default App;
