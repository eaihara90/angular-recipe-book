import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component
({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {

    private subscription = new Subscription();
    public recipes: Recipe[];

    constructor(private recipeService: RecipeService) { }

    ngOnInit(): void 
    {
        this.recipes = this.recipeService.getRecipes();

        this.subscription.add(this.recipeService.recipeChanged.subscribe((_recipes: Recipe[]) =>
        {
            this.recipes = _recipes;
        }))
    }

    ngOnDestroy(): void
    {
        this.subscription.unsubscribe();
    }
}
