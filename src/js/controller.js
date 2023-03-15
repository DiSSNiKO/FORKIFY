"use strict"

import * as model from "./model.js";
import recipeListView from "./views/recipeListView.js";
import recipeView from "./views/recipeView.js";
import loaderView from "./views/loaderView.js";
import bookmarkListView from "./views/bookmarkListView.js";
import newRecipeView from "./views/newRecipeView.js";


//Useful utility functions


//API functions

async function recipeListDataAndRender (searchKey) {
  loaderView.addLoadingSpinner(recipeListView.parentElement.closest(".recipe-list-cont"));
  await model.loadRecipeList(searchKey);
  loaderView.removeLoadingSpinner(recipeListView.parentElement.closest(".recipe-list-cont"));
  recipeListView.render(model.state.currentRecipes);
}

async function getRecipeList(searchKey) {
  try {
    if(recipeListView.parentElement.children.length>0){
      recipeListView.animateOutAndRenderNew(recipeListDataAndRender, searchKey);
    } else {
      recipeListView.prepareParentForNewDOM();
      recipeListDataAndRender(searchKey);
    }
    
  } catch (err) {
    alert('ERROR !! --> ' + err.toString());
  }
}
const bodei = document.querySelector('body');

bodei.addEventListener('click', (e)=>{console.log(e.target)})

async function getRecipeAid(searchId){
  loaderView.addLoadingSpinner(recipeView.topLevelElement);
  await model.loadRecipe(searchId);
  loaderView.removeLoadingSpinner(recipeView.topLevelElement);
  recipeView.render(model.state.loadedRecipe);
  recipeView.checkBookmarked(model.state.bookmarks, recipeView.data.title);
  recipeView.onRecipeChange(false);
}
async function getRecipe(searchId) {
  try {
    if(recipeView.parentElement.children.length<1){
      recipeView.onRecipeChange(true);
      getRecipeAid(searchId);
    } else {
      recipeView.onRecipeChange(true);
      recipeView.parentElement.addEventListener('transitionend', async function(){
        getRecipeAid(searchId); 
      },{once:true});
    }
    
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
    if(e.closest('.available-recipe')){
      const value = e.closest('.available-recipe').dataset.recipeId;
      getRecipe(value);
    };
  }
});

//newRecipeView


//Set initial state where needed
bookmarkListView.generateHTML(model.state.bookmarks);
newRecipeView.toggleModalAndReturnNewState(newRecipeView.newRecipeModalToggled);
// recipeView.parentElement.classList.add('transparency');
