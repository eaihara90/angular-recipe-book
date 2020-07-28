import { Injectable, OnInit, EventEmitter } from "@angular/core";
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable
({
    providedIn: 'root'
})

export class RecipeService implements OnInit
{   
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = 
    [
        new Recipe
        (
            'Fish \'n\' Chips', 
            'Delicious and fast Fish n\' Chips recipe',
            'https://cdn.tasteatlas.com/images/dishes/952be31521114ce89c8525996e17dbce.jpg?mw=1300',
            [
                new Ingredient('Potato', 2),
                new Ingredient('Fish', 3),
                new Ingredient('Lemon', 2),
                new Ingredient('Bread', 1),
                new Ingredient('Light beer', 1)
            ]
        ),
        new Recipe
        (
            'Tasty Schnitzel',
            'A super-tasy Schnitzel - just awesome!',
            'https://www.alegrafoods.com.br/wp-content/uploads/2020/04/como-fazer-lombo-suino-a-milanesa.png',
            [
                new Ingredient('Potato', 2),
                new Ingredient('Pork steak', 1),
                new Ingredient('Flower', 2),
                new Ingredient('Butter', 1)
            ]
        )
    ];

    constructor(private shoppingListService: ShoppingListService) {};

    ngOnInit() {}

    getRecipes()
    {
        return this.recipes.slice();
    }

    addIngredientsToList(ingredients: Ingredient[])
    {
        this.shoppingListService.addIngredients(ingredients);
    }
}