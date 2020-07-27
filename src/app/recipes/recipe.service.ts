import { Injectable, OnInit, EventEmitter } from "@angular/core";
import { Recipe } from './recipe.model';

@Injectable
({
    providedIn: 'root'
})

export class RecipeService implements OnInit
{   
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = 
    [
        new Recipe('Fish \'n\' Chips', 'Fish \' Chips recipe', 'https://cdn.tasteatlas.com/images/dishes/952be31521114ce89c8525996e17dbce.jpg?mw=1300'),
        new Recipe('Pasta', 'Pasta recipe', 'https://static.wixstatic.com/media/080aac_f21d6e1f3c3b436587a8b73b21bd22c5~mv2.jpg')
    ];

    constructor() {}

    ngOnInit() {}

    getRecipes()
    {
        return this.recipes.slice();
    }
}