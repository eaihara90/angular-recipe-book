import { Injectable, OnInit, EventEmitter } from "@angular/core";
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable
({
    providedIn: 'root'
})

export class RecipeService implements OnInit
{   
    public recipeChanged = new Subject<Recipe[]>();

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

    ngOnInit(): void { }

    getRecipes()
    {
        return this.recipes.slice();
    }

    public getRecipe(index: number): Recipe
    {
        const recipe = this.recipes.slice()[index];

        return recipe;
    }

    public addIngredientsToList(ingredients: Ingredient[])
    {
        this.shoppingListService.addIngredients(ingredients);
    }

    public addRecipe(_recipe: Recipe): void
    {
        const newRecipesList = [...this.recipes];

        newRecipesList.push(_recipe);

        this.recipes = [...newRecipesList];

        this.recipeChanged.next(this.recipes.slice());
    }

    public updateRecipe(index: number, _newRecipe: Recipe): void
    {
        const newRecipesList = [...this.recipes];

        newRecipesList[index] = _newRecipe;

        this.recipes = [...newRecipesList];

        this.recipeChanged.next(this.recipes.slice());
    }

    public deleteRecipe(index: number): void
    {
        const newRecipesList = [...this.recipes];

        newRecipesList.splice(index, 1);

        this.recipes = [...newRecipesList];

        this.recipeChanged.next(this.recipes.slice());
    }
}