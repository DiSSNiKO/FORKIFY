"use strict"

import * as model from "./model.js";
import recipeListView from "./views/recipeListView.js";
import recipeView from "./views/recipeView.js";

//dom elements




//global vars



//Useful utility functions
function pageButtonVisibility(left) {
  if (left) {
    if (recipeListView.currentPage === 0) {
      recipeListView.pageLeft.classList.add("no-display");
    } else {
      recipeListView.pageLeft.classList.remove("no-display");
      recipeListView.pageRight.classList.remove("no-display");
    }
  } else {
    if (recipeListView.currentPage === (Array.from(recipeListView.parentElement.childNodes).length) - 1) {
      recipeListView.pageRight.classList.add("no-display");
    } else {
      recipeListView.pageRight.classList.remove("no-display");
      recipeListView.pageLeft.classList.remove("no-display");
    }
  }
}

//API functions

async function getRecipeList(searchKey) {
  try {
    await model.loadRecipeList(searchKey);
    recipeListView.render(model.state.currentRecipes);
  } catch (err) {
    alert('ERROR !! --> ' + err.toString());
  }
}

async function getRecipe(searchId) {
  try {
    await model.loadRecipe(searchId);
    recipeView.render(model.state.loadedRecipe);
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
