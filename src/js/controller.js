"use strict"

import * as model from "./model.js";

//dom elements

const recipeDetails = document.querySelector('.recipe-details');
const recipeList = document.querySelector(".recipe-list");
const searchForm = document.querySelector("#ZaForumu");
const searchFormInput = searchForm.querySelector('input');
const pageLeft = document.querySelector(".page-left");
const pageRight = document.querySelector(".page-right");
const pagination = document.querySelector(".pagination-cont");


//global vars

let currentRecipes = [];

let currentPage = 0;

//Useful utility functions
function pageButtonVisibility(left) {
  if (left) {
    if (currentPage === 0) {
      pageLeft.classList.add("no-display");
    } else {
      pageLeft.classList.remove("no-display");
      pageRight.classList.remove("no-display");
    }
  } else {
    if (currentPage === (Array.from(recipeList.childNodes).length) - 1) {
      pageRight.classList.add("no-display");
    } else {
      pageRight.classList.remove("no-display");
      pageLeft.classList.remove("no-display");
    }
  }
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }
}
function toFraction(int) {
  const strint = int.toString();
  let fractionPart = '';
  let wholePart = '';
  let pointIndex = 0;
  if (strint.includes('.')) {
    for (const char of strint) {
      if (char === '.') {
        break;
      }
      pointIndex++;
    }
    fractionPart = strint.slice(pointIndex + 1);
    for (let i = 0; i < pointIndex; i++) {
      wholePart += strint[i];
    }
    return `${wholePart !== '0' ? wholePart : ""} ${fractionPart}/${10 ** fractionPart.length}`;
  } else {
    return int;
  }
}

//API functions
async function getRecipeList(searchKey) {
  removeAllChildNodes(recipeList);
  try {
    const request = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchKey.toLowerCase()}&key=3cdc47b8-f19f-4d45-a19d-762ee91490ad`);
    const data = await request.json()
    if (!request.ok) {
      if (request.status === 400) {
        throw new Error('Nope, naaah');
      }
    } else {
      currentPage = 0;
      pageLeft.classList.add("no-display");
      currentRecipes = data.data.recipes;
      const newdiv = document.createElement('div');
      newdiv.classList.add('pagenation-part');
      let last;
      currentRecipes.forEach((recipe, index) => {
        if (index === 0) {
          last = 0;
        }
        newdiv.insertAdjacentHTML("beforeend", `
                <div class="available-recipe" data-recipe-id=${recipe.id}>
                    <img src=${recipe.image_url} alt="Image">
                    <div>
                        <h1>${recipe.title}</h1>
                        <h2>${recipe.publisher}</h2>
                    </div>
                </div>
                `);
        if (index - last === 10) {
          recipeList.appendChild(newdiv.cloneNode(true));
          removeAllChildNodes(newdiv);
          console.log(newdiv)
          last = index;
          console.log(newdiv);
        }
      });
      recipeList.appendChild(newdiv.cloneNode(true));
      Array.from(recipeList.childNodes).forEach((elem, index) => {
        elem.dataset.pageId = index;
      });
      // console.log(currentRecipes)
      pagination.classList.remove('no-display');
    }
  } catch (err) {
    alert(`ara dzma racxa nitoa --> ${err}`)
  }
}
async function getRecipe(searchId) {
  removeAllChildNodes(recipeDetails);
  try {
    await model.loadRecipe(searchId);
    recipeDetails.insertAdjacentHTML("beforeend", `
      <div class="image-and-bookmark">
          <div class="image-and-title">
              <img src="${model.state.loadedRecipe.image_url}" alt="">
              <div class="orange-haze-overlay"></div>
              <h1>
                  <span class="recipe-title">${model.state.loadedRecipe.title}</span>
              </h1>
          </div>
          <div class="serving-time-bookmark">
              <div>
                  <div class="cook-time"><svg><use href="src/img/icons.svg#icon-clock"></use></svg> <strong>${model.state.loadedRecipe.cooking_time}</strong> Minutes</div>
                  <div class="serving-size-cont"><svg><use href="src/img/icons.svg#icon-users"></use></svg><strong>${model.state.loadedRecipe.servings}</strong>Servings<div class="inc-dec-servings"><svg><use href="src/img/icons.svg#icon-minus-circle"></use></svg><svg><use href="src/img/icons.svg#icon-plus-circle"></use></svg></div></div>
              </div>
              <button id="bookmark-btn"><svg><use href="src/img/icons.svg#icon-bookmark"></use></svg></button>
          </div>
      </div>
      <div class="ingredient-list-cont">
          <h1>RECIPE INGREDIENTS</h1>
          <div class="ingredient-list">
          </div>
      </div>
      <div class="go-to-instructions">
          <h1>HOW TO COOK IT</h1>
          <span>This recipe was carefully designed and tested by <strong>${model.state.loadedRecipe.publisher}</strong>. Please check out directions on their website.</span>
          <a href="${model.state.loadedRecipe.source_url}">DIRECTIONS<svg><use href="src/img/icons.svg#icon-arrow-right"></use></svg></a>
      </div>
    `);
    recipeDetails.dataset.recipeId = model.state.loadedRecipe.recipe_id;
    const ingredientList = recipeDetails.querySelector(".ingredient-list");
    model.state.loadedRecipe.ingredients.forEach((ingredient) => {
      ingredientList.insertAdjacentHTML('beforeend', `
                <span><svg><use href="src/img/icons.svg#icon-check"></use></svg>${ingredient.quantity != null ? toFraction(ingredient.quantity) + " " : " "}${ingredient.unit + " "}${ingredient.description}</span>
      `);
    });
  } catch (err) {
    alert(`ara dzma racxa nitoa --> ${err}`)
  }
}

//Event listeners
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = searchFormInput.value;
  searchFormInput.value = '';
  getRecipeList(value);
});
recipeList.addEventListener('click', (e) => {
  e = e.target;
  if (!e.classList.contains('recipe-list')) {
    const value = e.closest('.available-recipe').dataset.recipeId;
    getRecipe(value);
  }
});
pageRight.addEventListener('click', () => {
  if (!(currentPage >= (Array.from(recipeList.childNodes).length) - 1)) {
    currentPage++;
    const translation = currentPage * 100;
    recipeList.style.transform = `translateX(${-translation}%)`;
    pageButtonVisibility(false);
  }
});
pageLeft.addEventListener('click', () => {
  if (currentPage - 1 !== -1) {
    currentPage--;
    const translation = currentPage * 100;
    recipeList.style.transform = `translateX(${-translation}%)`;
    pageButtonVisibility(true);
  }
});