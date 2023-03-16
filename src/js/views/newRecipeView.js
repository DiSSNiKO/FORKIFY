import { removeWhiteSpace } from "../utilities.js";
class newRecipeView {
    constructor () {
        this.addRecipeButton.addEventListener('click', ()=> {
            this.newRecipeModalToggled = this.toggleModalAndReturnNewState(this.newRecipeModalToggled);
        });
        
        this.modalBackground.addEventListener('transitionend', ()=>{
            if(!this.newRecipeModalToggled){
            this.modalBackground.classList.add('no-display-pseudo');
            }
        });
        
        this.modalBackground.addEventListener('click', (e)=>{
            if(e.target.classList.contains('new-recipe-overlay')){
                this.newRecipeModalToggled = this.toggleModalAndReturnNewState(true);
            }
        })
    }
    newRecipeModalToggled = false;
    parentElement = document.querySelector(".add-recipe-modal");
    modalBackground = this.parentElement.closest('.new-recipe-overlay');
    addRecipeButton = document.querySelector("#add-recipe-btn");
    isInitialLoad = true;
    inputArray = Array.from(this.parentElement.querySelectorAll('input'));

    verifyIngredientFormat(ingredient){
        ingredient = removeWhiteSpace(ingredient);
        const matchString1 = /\d\.\d\,(?:kg|lbs)\,\w+/;
        const matchString2 = /\d\,(?:kg|lbs|g )\,\w+/;
        if(matchString1.test(ingredient)){
            return true;
        } else if ( matchString2.test(ingredient)){
            return true;
        } else {
            return false;
        }
    }

    validateInputs(){
        let inputsValidated = true;
        for(let i = 0; i<6; i++){
            if(!this.verifyIngredientFormat(removeWhiteSpace(this.inputArray[i].value))&&!removeWhiteSpace(this.inputArray[i].value==="")){
                inputsValidated = false;
            }
        }
        let ingredientFaults = 0
        for(let i = 5; i<12; i++){
            if(!this.verifyIngredientFormat(removeWhiteSpace(this.inputArray[i].value))){
                ingredientFaults++;
            }
        }
        if(ingredientFaults===6){ // all ingredients are incorrect
            inputsValidated = false;
        }
        return inputsValidated;
    }

    toggleModalAndReturnNewState(state){
        if(state||this.isInitialLoad){
            this.isInitialLoad = false;
            this.modalBackground.classList.add('transparency');
            this.addRecipeButton.classList.remove('disabled');
            return false;
        } else {
            this.modalBackground.classList.remove('no-display-pseudo');
            this.modalBackground.classList.remove('transparency');
            this.addRecipeButton.classList.add('disabled');
            return true;
        }
    }
    uploadNewRecipe(){
        const newRecipeObject = {
            cooking_time: null,
            id: null,
            image_url: null,
            ingredients: [],
            publisher: null, 
            servings: null,
            source_url: null,
            title: null
        }
    }
}

export default new newRecipeView();