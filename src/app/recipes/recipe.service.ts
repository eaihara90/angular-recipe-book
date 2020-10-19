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

    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) {};

    ngOnInit(): void { }

    public getRecipes()
    {
        return this.recipes.slice();
    }

    public getRecipe(index: number): Recipe
    {
        const recipe = this.recipes.slice()[index];

        return recipe;
    }

    public setRecipes(recipes: Recipe[]): void {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
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