class bookmarkView {
    
    constructor () {
        this.showBKmarks.addEventListener('click', ()=>{
            this.showBookmarks(this.parentElement, false);
        });          
    }

    parentElement = document.querySelector(".bookmarked-recipes-cont");
    showBKmarks = document.querySelector("#show-bookmarks-btn");

    showBookmarks(elem, forceClose){
        if(forceClose){
            elem.classList.remove('bookmarks-on');
            return;
        }
        if(elem.classList.contains('bookmarks-on')){
            elem.classList.remove('bookmarks-on');
        } else {
            elem.classList.add('bookmarks-on');
        }
    }
    dynamicClosing(e){
        const eTarget = e.target;
        const bookmarkBaton = eTarget.closest('button');
        if(!eTarget.closest('.no-bookmarks-question-mark')){
            if(bookmarkBaton){
            return;
            } else {
            this.showBookmarks(this.parentElement, true);
            }
        }
    }
    generateHTML(bookmarkObject){
        let eichtiemel = '';
        Object.entries(bookmarkObject).forEach((entry)=>{
            entry = entry[1];
            eichtiemel+=`<div class="available-recipe" data-recipe-id=${entry.id}><img src=${entry.image_url} alt="Image"><div><h1>${entry.title}</h1><h2>${entry.publisher}</h2></div></div>`;
        });
        if(eichtiemel!==''){
            this.parentElement.innerHTML = eichtiemel;
        } else {
            this.parentElement.innerHTML = `
            <div class='no-bookmarks-question-mark'>
                You dont have any bookmarked recipes.
            </div>
            `;
        }
        
    }
}

export default new bookmarkView();