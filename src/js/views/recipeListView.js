class RecipeListView {
    constructor() {
        this.parentElement = document.querySelector('.recipe-list');
        //related elements
        this.pageLeft = document.querySelector(".page-left");
        this.pageRight = document.querySelector(".page-right");
        this.pagination = document.querySelector(".pagination-cont");
        this.data;
        this.searchForm = document.querySelector("#ZaForumu");
        this.searchFormInput = this.searchForm.querySelector('input');
        // ^
        this.currentPage = 0;
    }



    render(data) {
        this.data = data;
        this.clear();

        this.generateMarkup();
    }
    clear() {
        this.parentElement.innerHTML = "";
    }
    generateMarkup() {
        this.currentPage = 0;
        this.pageLeft.classList.add("no-display");
        this.pageRight.classList.remove('no-display');
        this.parentElement.style.transform = "translateX(0%)";
        let eichteaml = ``;
        let currentRecipeSet = 0;
        const RecipesPerSet = 5;
        this.data.forEach((recipe) => {
            eichteaml += `
            <div class="available-recipe" data-recipe-id=${recipe.id}><img src=${recipe.image_url} alt="Image"><div><h1>${recipe.title}</h1><h2>${recipe.publisher}</h2></div></div>`;
            currentRecipeSet += 1;
            if (currentRecipeSet === RecipesPerSet) {
                this.parentElement.insertAdjacentHTML('beforeend',
                    `<div class='pagenation-part'>${eichteaml}</div>`);
                eichteaml = "";
                currentRecipeSet = 0;
            }
        });
        if (eichteaml.length !== 0) {
            this.parentElement.insertAdjacentHTML('beforeend',
                `<div class='pagenation-part'>${eichteaml}</div>`);
        }
        Array.from(this.parentElement.childNodes).forEach((elem, index) => {
            elem.dataset.pageId = index;
        });
        this.pagination.classList.remove('no-display');
    }
}
export default new RecipeListView();