// Global app controller
import Search from './models/Search';
import { elements } from './views/base';
import * as searchView from './views/searchView';


/*  Global State of teh App
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

        // search for recipes
        await state.search.getResults();

        // render results in UI
        console.log(state.search.result);
     }
};

elements.searchForm.addEventListener('submit', evt => {
    evt.preventDefault();
    controlSearch();
});
