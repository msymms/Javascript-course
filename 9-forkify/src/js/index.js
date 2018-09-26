// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';


/*  Global State of the App
*   - Search object
*   - Current recipe object
*   - Shopping list object
*   - Liked recipes object
*/
const state = {};

/*
    SEARCH CONTROLLER
 */

const controlSearch = async () => {
    // Get the query from the view
    const query = searchView.getInput();
    if (query) {
        // New search object and add to state
        state.search = new Search(query);

        // Prepare UI for results
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try{
            // search for recipes
            await state.search.getResults();

            // render results in UI
            clearLoader();
            searchView.renderResult(state.search.result);
            searchView.clearInput();
        } catch {
            // handle error
            clearLoader();
        }
     }
};

elements.searchForm.addEventListener('submit', evt => {
    evt.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn) {
      const gotoPage = parseInt(btn.dataset.goto, 10);
      searchView.clearResults();
      searchView.renderResult(state.search.result, gotoPage);
    }

});


/*
    RECIPE CONTROLLER
 */

//add the hashchange event listener


const controlRecipe = async () => {
    //GEt ID from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare UI for recipe

        //Create new recipe object
        state.recipe = new Recipe(id);

        try {
            //get the recipe data
            await state.recipe.getRecipe();
            //get the time and servings
            state.recipe.calcServings();
            state.recipe.calcTime();

            //render the recipe
            console.log(state.recipe);
        } catch {
            alert('Recipe not found!');
        }

    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));