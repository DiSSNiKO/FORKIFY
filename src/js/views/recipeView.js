import { toFraction } from "../utilities.js"

class RecipeView {
    #parentElement = document.querySelector('.recipe-details');
    #data;

    render(data) {
        this.#data = data;
        this.clearRecipe();
        const markup = this.generateMarkup();
        this.#parentElement.dataset.recipeId = this.#data.id;
        this.#parentElement.insertAdjacentHTML('beforeend', markup);
    }
    clearRecipe() {
        this.#parentElement.innerHTML = "";
    }
    generateMarkup() {
        let ingredientListInnerHTML = "";
        this.#data.ingredients.forEach((ingredient) => {
            ingredientListInnerHTML += `<span><svg><use href="src/img/icons.svg#icon-check"></use></svg>${ingredient.quantity != null ? toFraction(ingredient.quantity) + " " : " "}${ingredient.unit + " "}${ingredient.description}</span>\n`
        });
        const markuup = `
        <div class="image-and-bookmark">
            <div class="image-and-title">
                <img src="${this.#data.image_url}" alt="">
                <div class="orange-haze-overlay"></div>
                <h1>
                    <span class="recipe-title">${this.#data.title}</span>
                </h1>
            </div>
            <div class="serving-time-bookmark">
                <div>
                    <div class="cook-time"><svg><use href="src/img/icons.svg#icon-clock"></use></svg> <strong>${this.#data.cooking_time}</strong> Minutes</div>
                    <div class="serving-size-cont"><svg><use href="src/img/icons.svg#icon-users"></use></svg><strong>${this.#data.servings}</strong>Servings<div class="inc-dec-servings"><svg><use href="src/img/icons.svg#icon-minus-circle"></use></svg><svg><use href="src/img/icons.svg#icon-plus-circle"></use></svg></div></div>
                </div>
                <button id="bookmark-btn"><svg><use href="src/img/icons.svg#icon-bookmark"></use></svg></button>
            </div>
        </div>
        <div class="ingredient-list-cont">
            <h1>RECIPE INGREDIENTS</h1>
            <div class="ingredient-list">
                ${ingredientListInnerHTML}
            </div>
        </div>
        <div class="go-to-instructions">
            <h1>HOW TO COOK IT</h1>
            <span>This recipe was carefully designed and tested by <strong>${this.#data.publisher}</strong>. Please check out directions on their website.</span>
            <a href="${this.#data.source_url}">DIRECTIONS<svg><use href="src/img/icons.svg#icon-arrow-right"></use></svg></a>
        </div>
        `;
        return markuup;
    }
}
export default new RecipeView();