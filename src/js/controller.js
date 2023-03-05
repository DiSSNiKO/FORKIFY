"use strict"

import * as model from "./model.js";
import recipeListView from "./views/recipeListView.js";
import recipeView from "./views/recipeView.js";
import loaderView from "./views/loaderView.js";
import bookmarkListView from "./views/bookmarkListView.js";
import newRecipeView from "./views/newRecipeView.js";

//dom elements




//global vars



//Useful utility functions
function pageButtonVisibility(left) {
  if (left) {
    if (recipeListView.currentPage === 0) {
      recipeListView.pageLeft.classList.add("no-interaction");
    } else {
      recipeListView.pageLeft.classList.remove("no-interaction");
      recipeListView.pageRight.classList.remove("no-interaction");
    }
  } else {
    if (recipeListView.currentPage === (Array.from(recipeListView.parentElement.childNodes).length) - 1) {
      recipeListView.pageRight.classList.add("no-interaction");
    } else {
      recipeListView.pageRight.classList.remove("no-interaction");
      recipeListView.pageLeft.classList.remove("no-interaction");
    }
  }
}

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

//event listeners


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
recipeListView.pageRight.addEventListener('click', () => {
  if (!(recipeListView.currentPage >= (Array.from(recipeListView.parentElement.childNodes).length) - 1)) {
    recipeListView.currentPage++;
    const translation = recipeListView.currentPage * 100;
    recipeListView.parentElement.style.transform = `translateX(${-translation}%)`;
    pageButtonVisibility(false);
  }
});
recipeListView.pageLeft.addEventListener('click', () => {
  if (recipeListView.currentPage - 1 !== -1) {
    recipeListView.currentPage--;
    const translation = recipeListView.currentPage * 100;
    recipeListView.parentElement.style.transform = `translateX(${-translation}%)`;
    pageButtonVisibility(true);
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

bookmarkListView.showBKmarks.addEventListener('click', ()=>{
  bookmarkListView.showBookmarks(bookmarkListView.parentElement);
});

bookmarkListView.generateHTML(model.state.bookmarks); //initial state

model.state.newRecipeModalToggled = newRecipeView.toggleModalAndReturnNewState(model.state.newRecipeModalToggled);

bookmarkListView.parentElement.addEventListener('click',(e)=>{
  e = e.target;
  if (!e.classList.contains('bookmarked-recipes-cont')) {
    const value = e.closest('.available-recipe').dataset.recipeId;
    getRecipe(value);
  }
});

//newRecipeView

newRecipeView.addRecipeButton.addEventListener('click', ()=> {
  model.state.newRecipeModalToggled = newRecipeView.toggleModalAndReturnNewState(model.state.newRecipeModalToggled);
});

newRecipeView.modalBackground.addEventListener('transitionend', ()=>{
  if(!model.state.newRecipeModalToggled){
    newRecipeView.modalBackground.classList.add('no-display-pseudo');
  }
});

const plswork = newRecipeView.toggleModalAndReturnNewState.bind(newRecipeView);

newRecipeView.modalBackground.addEventListener('click', (e)=>{
  if(e.target.classList.contains('new-recipe-overlay')){
    model.state.newRecipeModalToggled = plswork(model.state.newRecipeModalToggled);
  }
})