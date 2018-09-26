// Global app controller
import Search from './models/Search';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';


/*  Global State of the App
*   - Search object
*   - Current recipe object
*   - Shopping list object
*   - Liked recipes object
*/
const state = {};

const controlSearch = async () => {
    // Get the query from the view
    const query = searchView.getInput();
    if (query) {
        // New search object and add to state
        state.search = new Search(query);

        // Prepare UI for results
        searchView.clearResults();
        renderLoader(elements.searchRes);
        // search for recipes
        await state.search.getResults();

        // render results in UI
        clearLoader();
        searchView.renderResult(state.search.result);
        searchView.clearInput();
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