import { toFraction } from "../utilities.js";
import * as model from "../model";

class RecipeView {
    parentElement = document.querySelector('.recipe-details');
    data;
    servingAmount = 1;
    render(data) {
        this.data = data;
        this.servingAmount = data.servings;
        const markup = this.generateMarkup();
        this.parentElement.dataset.recipeId = this.data.id;
        this.parentElement.innerHTML = markup;
        this.increaseServ = this.parentElement.querySelector(".increase-servings");
        this.decreaseServ = this.parentElement.querySelector(".decrease-servings");
        this.ingredientList = this.parentElement.querySelector(".ingredient-list");
        this.servingDisplay = this.parentElement.querySelector(".serving-size-cont").querySelector('strong');
        this.decreaseServ.addEventListener('click',()=>{
            this.changeServingSize(false);
        });
        this.increaseServ.addEventListener('click',()=>{
            this.changeServingSize(true);
        });
    }
    handleBookmarks(){
        const bookmarkData = {
            ...model.state.bookmarks
        }
        bookmarkData[`${this.data.title}`] = this.data;
        model.state.bookmarks = bookmarkData;
    }
    clearRecipe() {
        this.parentElement.innerHTML = "";
    }
    changeServingSize(inthecrease){
        let ingredientListInnerHTML = '';
        if(inthecrease){
            this.servingAmount++;
            this.servingDisplay.textContent = this.servingAmount;
            this.data.ingredients.forEach((ingredient) => {
                let loneServing = (ingredient.quantity/this.data.servings);
                ingredientListInnerHTML += `<span><svg><use href="src/img/icons.svgicon-check"></use></svg>${ingredient.quantity != null ? toFraction(loneServing*this.servingAmount) + " " : " "}${ingredient.unit + " "}${ingredient.description}</span>\n`
            });
            this.ingredientList.innerHTML=ingredientListInnerHTML;
        } else {
            if(this.servingAmount-1!=0){
                this.servingAmount--;
                this.servingDisplay.textContent = this.servingAmount;
                this.data.ingredients.forEach((ingredient) => {
                    let loneServing = (ingredient.quantity/this.data.servings);
                    ingredientListInnerHTML += `<span><svg><use href="src/img/icons.svgicon-check"></use></svg>${ingredient.quantity != null ? toFraction(loneServing*this.servingAmount) + " " : " "}${ingredient.unit + " "}${ingredient.description}</span>\n`
                });
                this.ingredientList.innerHTML=ingredientListInnerHTML;
            }
        }
    }
    onRecipeChange(clearDisplay) {
        if (clearDisplay) {
            this.parentElement.classList.add('invisible-content');
            this.parentElement.style.userSelect = 'none';
            this.parentElement.style.pointerEvents = 'none';
            if(this.increaseServ){
                this.increaseServ.removeEventListener('click', ()=>{
                    this.changeServingSize(true)
                });
                this.decreaseServ.removeEventListener('click', ()=>{
                    this.changeServingSize(false)
                });
                this.bookmarkButton.removeEventListener('click', this.handleBookmarks)
            }
        } else {
            this.parentElement.classList.remove('invisible-content');
            this.parentElement.style.userSelect = 'auto';
            this.parentElement.style.pointerEvents = 'auto';
        }
    }
    generateMarkup() {
        let ingredientListInnerHTML = "";
        this.data.ingredients.forEach((ingredient) => {
            let loneServing = (ingredient.quantity/this.data.servings);
            ingredientListInnerHTML += `<span><svg><use href="src/img/icons.svgicon-check"></use></svg>${ingredient.quantity != null ? toFraction(loneServing*this.servingAmount) + " " : " "}${ingredient.unit + " "}${ingredient.description}</span>\n`
        });
        const markuup = `
        <div class="image-and-bookmark">
            <div class="image-and-title">
                <img src="${this.data.image_url}" alt="">
                <div class="orange-haze-overlay"></div>
                <h1>
                    <span class="recipe-title">${this.data.title}</span>
                </h1>
            </div>
            <div class="serving-time-bookmark">
                <div>
                    <div class="cook-time"><svg><use href="src/img/icons.svg#icon-clock"></use></svg> <strong>${this.data.cooking_time}</strong> Minutes</div>
                    <div class="serving-size-cont"><svg><use href="src/img/icons.svg#icon-users"></use></svg><strong>${this.servingAmount}</strong>Servings<div class="inc-dec-servings"><svg class='decrease-servings'><use href="src/img/icons.svg#icon-minus-circle"></use></svg><svg class='increase-servings'><use href="src/img/icons.svg#icon-plus-circle"></use></svg></div></div>
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
            <span>This recipe was carefully designed and tested by <strong>${this.data.publisher}</strong>. Please check out directions on their website.</span>
            <a href="${this.data.source_url}">DIRECTIONS<svg><use href="src/img/icons.svg#icon-arrow-right"></use></svg></a>
        </div>
        `;
        return markuup;
    }
}
export default new RecipeView();