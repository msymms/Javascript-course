import axios from 'axios';
/*
API key
    accd6cb585da7c8de258c45ff44fdf75
 Search URL
    https://www.food2fork.com/api/search
 */

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const key = 'accd6cb585da7c8de258c45ff44fdf75';
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
        } catch (error) {
         //handle error
        }
    }
}
