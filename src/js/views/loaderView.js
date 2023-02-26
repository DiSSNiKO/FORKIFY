class loadingSpinner {
    constructor() {
        this.loader = `
        <div class="loader">
            <div class="loadspinnergeneral loadspinner1"></div>
            <div class="loadspinnergeneral loadspinner2"></div>
            <div class="loadspinnergeneral loadspinner3"></div>
            <div class="loadspinnergeneral loadspinner4"></div>
            <div class="loadspinnergeneral loadspinner5"></div>
            <div class="loadspinnergeneral loadspinner6"></div>
            <div class="loadspinnergeneral loadspinner7"></div>
            <div class="loadspinnergeneral loadspinner8"></div>
        </div>
        `
    }
    addLoadingSpinner = (parent) => {
        if (parent.style.position.toLowerCase() === 'static' || parent.style.position === '') {
            parent.dataset.initialPosStyle = parent.style.position;
            parent.style.position = 'relative';
        }
        parent.insertAdjacentHTML('beforeend', this.loader)
    }
    removeLoadingSpinner = (parent) => {
        const toRemove = parent.querySelector('.loader');
        if (!toRemove) {
            return 0;
        }
        toRemove.remove();
        parent.style.position = parent.dataset.initialPosStyle;
    }
}
export default new loadingSpinner();