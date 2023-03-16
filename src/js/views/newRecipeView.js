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
        this.uploadNewRecipeButton.addEventListener("click",(e)=>{
            e.preventDefault();
            console.log(this.validateInputs());
        });
    }
    apiKey = ''
    newRecipeModalToggled = false;
    parentElement = document.querySelector(".add-recipe-modal");
    modalBackground = this.parentElement.closest('.new-recipe-overlay');
    addRecipeButton = document.querySelector("#add-recipe-btn");
    uploadNewRecipeButton = this.parentElement.querySelector('a');
    isInitialLoad = true;
    inputArray = Array.from(this.parentElement.querySelectorAll('input'));

    verifyIngredientFormat(ingredient){
        ingredient = removeWhiteSpace(ingredient);
        const matchString1 = /\d\.\d\,(?:kg|lbs)\,\w+/;
        const matchString2 = /\d\,(?:kg|lbs|g)\,\w+/;
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
            if(this.inputArray[i].value===''){
                return false;
            } else if(removeWhiteSpace(this.inputArray[i].value)===''){
                return false;
            }
        }
        let ingredientFaults = 0;
        let needsChecking = 0;
        for(let i = 6; i<12; i++){
            if(this.inputArray[i].value!=''){
                needsChecking++;
            }
        }
        for(let i = 6; i<12; i++){
            if(this.inputArray[i].value!=''){
                if(!this.verifyIngredientFormat(removeWhiteSpace(this.inputArray[i].value))){
                    ingredientFaults++;
                }
            }
        }
        if(ingredientFaults===0&&needsChecking>0){ // ingredient is incorrect
            inputsValidated = true;
        } else {
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
        if(this.validateInputs()){
            const newRecipeObject = {
                cooking_time: null,
                image_url: null,
                ingredients: [],
                publisher: null, 
                servings: null,
                source_url: null,
                title: null
            }
            newRecipeObject.cooking_time = +this.inputArray[4].value;
            newRecipeObject.title = this.inputArray[0].value;
            newRecipeObject.source_url = this.inputArray[1].value;
            newRecipeObject.image_url = this.inputArray[2].value;
            newRecipeObject.publisher = this.inputArray[3].value;
            newRecipeObject.servings = +this.inputArray[5].value;
        }
        console.log(newRecipeObject); //The API no longer allows POST requests RIP ANYWAYS NODEJS HERE WE COMEEEEEEE
    }
}

export default new newRecipeView();