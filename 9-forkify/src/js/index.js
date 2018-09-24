// Global app controller
import Search from './models/Search';
const search = new Search('pizza');

/*  Global State of teh App
*   - Search object
*   - Current recipe object
*   - Shopping list object
*   - Liked recipes object
*/
const state = {};

const controlSearch = async () => {
    // Get the query from the view
    const query = 'pizza'; //TODO
    if (query) {
        // New search object and add to state
        state.search = new Search(query);

        // Prepare UI for results

        // search for recipes
        await state.search.getResults();

        // render results in UI

    }
};

document.querySelector('search').addEventListener('submit', evt => {
    evt.preventDefault();
    controlSearch();
});

search.getResults();
