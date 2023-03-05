class newRecipeView {
    parentElement = document.querySelector(".add-recipe-modal");
    modalBackground = this.parentElement.closest('.new-recipe-overlay');
    addRecipeButton = document.querySelector("#add-recipe-btn");
    isInitialLoad = true;
    inputArray = Array.from(this.parentElement.querySelectorAll('input'));
    toggleModalAndReturnNewState(state){
        if(state||this.isInitialLoad){
            this.isInitialLoad = false;
            this.modalBackground.classList.add('transparency');
            this.addRecipeButton.classList.remove('disabled');
            console.log(this.inputArray);
            return false;
        } else {
            this.modalBackground.classList.remove('no-display-pseudo');
            this.modalBackground.classList.remove('transparency');
            this.addRecipeButton.classList.add('disabled');
            return true;
        }
    }
}

export default new newRecipeView();