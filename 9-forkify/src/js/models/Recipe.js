import axios from 'axios';
import { key } from '../config';

export default class Recipe {
    constructor(recipe_id) {
        this.id = recipe_id;
    }

    async getRecipe() {

        try {
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.image = res.data.recipe.image_url;
            this.source_url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;


        } catch (error) {
            console.log(error);
        }
    }

    //Assuming 15 minutes for every 3 ingredients
    calcTime() {
        this.time = Math.ceil(this.ingredients.length / 3) * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(el => {

            //make units uniform
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            //remove parenthetical statements
            ingredient = ingredient.replace(/ *\([^]*\) */g, '');

            //parse Ingredients into count, unit, and ingredient


        });
        this.ingredients = newIngredients;
    }
}


