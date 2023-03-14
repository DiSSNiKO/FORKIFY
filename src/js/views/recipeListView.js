class RecipeListView {
    constructor() {
        this.parentElement = document.querySelector('.recipe-list');
        //related elements
        this.pageLeft = document.querySelector(".page-left");
        this.pageRight = document.querySelector(".page-right");
        this.pagination = document.querySelector(".pagination-cont");
        this.data;
        this.pageToHide;
        this.searchForm = document.querySelector("#ZaForumu");
        this.searchFormInput = this.searchForm.querySelector('input');
        // ^
        this.currentPage = 0;
        this.pageRight.addEventListener('click', () => {
            if (!(this.currentPage >= (Array.from(this.parentElement.children).length) - 1)) {
              this.currentPage++;
              const translation = this.currentPage * 100;
              this.parentElement.style.transform = `translateX(${-translation}%)`;
              this.pageButtonVisibility(false);
            }
        });
        this.pageLeft.addEventListener('click', () => {
          if (this.currentPage - 1 !== -1) {
            this.currentPage--;
            const translation = this.currentPage * 100;
            this.parentElement.style.transform = `translateX(${-translation}%)`;
            this.pageButtonVisibility(true);
          }
        });
    }



    render(data) {
        this.data = data;
        this.clear();
        this.generateMarkup();
    }
    clear() {
        this.parentElement.innerHTML = "";
    }
    prepareParentForNewDOM() {
      this.parentElement.innerHTML = '';
      this.parentElement.style.transition = 'all 0s';      
      this.parentElement.style.transform = "translateX(100%)";
      this.parentElement.style.pointerEvents = 'auto';
    }
    //Handles the entry animation for recipe list and the pagenation buttons
    animateIn(){ 
      const handlePageButtons = function() {
        if (Array.from(this.parentElement.childNodes).length === 1) {
          this.pageRight.classList.add('no-interaction');
        } else {
          this.pageRight.classList.remove('no-interaction');
        }
        this.pagination.classList.remove('no-interaction-harsh');
        this.parentElement.style.pointerEvents = 'auto';
        this.parentElement.style.transition = 'all 0.3s';
      }
      this.parentElement.addEventListener('transitionend', handlePageButtons.bind(this), {once:true});
      this.pageToHide && this.pageToHide.classList.remove('no-interaction-harsh');
      this.pageToHide = null;
      this.parentElement.style.transition = 'all 1s';      
      this.parentElement.style.opacity = '1';          
      this.parentElement.style.pointerEvents = 'none';
      this.parentElement.style.transform = "translateX(0%)";
      this.parentElement.style.overflowX = 'visible';
      this.parentElement.style.width = "auto";
    }
    //Handles the leave animation for recipe list and the pagenation buttons
    animateOutAndRenderNew (leFunqcion, searchKey){
      this.pagination.classList.add('no-interaction-harsh');
      const handleLeaveAnim = function() {
        this.prepareParentForNewDOM();
        leFunqcion(searchKey);
      }
      this.parentElement.addEventListener('transitionend', handleLeaveAnim.bind(this), {once:true});
      let pageIndex = this.parentElement.style.transform[11] === '-' ? this.parentElement.style.transform[12]:this.parentElement.style.transform[11];
      console.log(pageIndex)
      if (pageIndex<this.parentElement.children.length - 1){
        pageIndex++;
        this.pageToHide = this.parentElement.querySelector(`[data-page-id="${pageIndex}"]`);
        console.log(this.pageToHide, this.parentElement.children.length)
        this.pageToHide.classList.add("no-interaction-harsh");
      }
      if(Number(pageIndex)===0){
        pageIndex=1; //edge case fix (when you are on page 0 pageIndex is 0 thus the animation wont play without this translate(000%) will do jack shit)
      }
      this.parentElement.style.transition = 'all 1s';      
      this.parentElement.style.opacity = '0';          
      this.parentElement.style.pointerEvents = 'none';
      console.log(pageIndex)
      this.parentElement.style.transform = `translateX(-${pageIndex}00%)`;
    }
    generateMarkup() {
        this.currentPage = 0;
        if (this.data.length === 0) {
            this.pageLeft.classList.add("no-interaction");
            this.pageRight.classList.add('no-interaction');
            return;
        }
        this.pageLeft.classList.add("no-interaction");
        this.pageRight.classList.add('no-interaction');
        let eichteaml = ``;
        let currentRecipeSet = 0;
        let RecipesPerSet = 8;
        if(window.innerWidth <= 840){
          RecipesPerSet = 3;
        }
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
        this.pagination.classList.remove('no-interaction-harsh');
        this.animateIn();

      }
    pageButtonVisibility(left) {
        if (left) {
          if (this.currentPage === 0) {
            this.pageLeft.classList.add("no-interaction");
            this.pageRight.classList.remove("no-interaction");
          } else {
            this.pageLeft.classList.remove("no-interaction");
            this.pageRight.classList.remove("no-interaction");
          }
        } else {
          if (this.currentPage === (Array.from(this.parentElement.childNodes).length) - 1) {
            this.pageRight.classList.add("no-interaction");
            this.pageLeft.classList.remove("no-interaction");
          } else {
            this.pageRight.classList.remove("no-interaction");
            this.pageLeft.classList.remove("no-interaction");
          }
        }
      }
}
export default new RecipeListView();