"use strict"

import * as model from "./model.js";
import recipeListView from "./views/recipeListView.js";
import recipeView from "./views/recipeView.js";
import loaderView from "./views/loaderView.js";
import bookmarkListView from "./views/bookmarkListView.js";
import newRecipeView from "./views/newRecipeView.js";


//Useful utility functions


//API functions

async function getRecipeList(searchKey) {
  try {
    recipeListView.prepareParentForNewDOM();
    loaderView.addLoadingSpinner(recipeListView.parentElement);
    await model.loadRecipeList(searchKey);
    loaderView.removeLoadingSpinner(recipeListView.parentElement);
    recipeListView.render(model.state.currentRecipes);
  } catch (err) {
    alert('ERROR !! --> ' + err.toString());
  }
}

async function getRecipe(searchId) {
  try {
    // recipeView.parentElement.innerHTML = '';
    recipeView.onRecipeChange(true);
    loaderView.addLoadingSpinner(recipeView.parentElement);
    await model.loadRecipe(searchId);
    loaderView.removeLoadingSpinner(recipeView.parentElement);
    recipeView.render(model.state.loadedRecipe);
    recipeView.checkBookmarked(model.state.bookmarks, recipeView.data.title);
    recipeView.onRecipeChange(false);
  } catch (err) {
    alert(`ara dzma racxa nitoa --> ${err}`)
  }
}

//event listeners that require controller


//recipeListView

recipeListView.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = recipeListView.searchFormInput.value;
  recipeListView.searchFormInput.value = '';
  getRecipeList(value);
});
recipeListView.parentElement.addEventListener('click', (e) => {
  e = e.target;
  if (!(e.classList.contains('recipe-list')||e.classList.contains('pagenation-part'))) {
    const value = e.closest('.available-recipe').dataset.recipeId;
    getRecipe(value);
  }
});

//recipeView

recipeView.parentElement.addEventListener('click',(e)=>{
  const mainButton = e.target.closest('button');
  if(mainButton){
    if(mainButton.id==='bookmark-btn'){
      model.state.bookmarks = recipeView.handleBookmarks(model.state.bookmarks);
      recipeView.checkBookmarked(model.state.bookmarks, recipeView.data.title);
  }
  bookmarkListView.generateHTML(model.state.bookmarks); 
}});

//bookmarksView

bookmarkListView.parentElement.addEventListener('click',(e)=>{
  e = e.target;
  if (!e.classList.contains('bookmarked-recipes-cont')) {
    const value = e.closest('.available-recipe').dataset.recipeId;
    getRecipe(value);
  }
});

//newRecipeView


//Set initial state where needed
bookmarkListView.generateHTML(model.state.bookmarks);
newRecipeView.toggleModalAndReturnNewState(newRecipeView.newRecipeModalToggled);
