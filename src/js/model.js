export const state = {
    loadedRecipe: {},
    currentRecipes: [],
    bookmarks: []
}
export const loadRecipe = async function (searchId) {
    const request = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${searchId}`);
    const data = await request.json();
    if (!request.ok) {
        if (request.status === 400) {
            throw new Error('IIROOOR');
        }
    } else {
        state.loadedRecipe = data.data.recipe;
    }
    console.log(state)
}

export const loadRecipeList = async function (searchKey) {
    try {
        const request = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchKey.toLowerCase()}&key=3cdc47b8-f19f-4d45-a19d-762ee91490ad`);
        const data = await request.json()
        if (!request.ok) {
            if (request.status === 400) {
                throw new Error('Nope, naaah');
            }
        }
        state.currentRecipes = data.data.recipes;
    } catch (err) {
        alert(`ara dzma racxa nitoa --> ${err}`)
    }
}