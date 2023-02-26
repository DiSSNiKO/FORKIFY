"use strict"

import * as model from "./model.js";
import recipeListView from "./views/recipeListView.js";
import recipeView from "./views/recipeView.js";
import loaderView from "./views/loaderView.js";

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
    recipeView.onRecipeChange(false);
  } catch (err) {
    alert(`ara dzma racxa nitoa --> ${err}`)
  }
}

//event listeners


recipeListView.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = recipeListView.searchFormInput.value;
  recipeListView.searchFormInput.value = '';
  getRecipeList(value);
});
recipeListView.parentElement.addEventListener('click', (e) => {
  e = e.target;
  if (!e.classList.contains('recipe-list')) {
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
