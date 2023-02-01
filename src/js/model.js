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
}
// export const loadRecipeList = async function () {

// }