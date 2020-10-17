import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { transition, style, animate, trigger } from '@angular/animations';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component
({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.scss'],
    animations:[
        trigger('init', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-in', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                style({ opacity: 1 }),
                animate('300ms ease-out', style({ opacity: 0 }))
            ])
        ])
    ]
})

export class RecipeDetailComponent implements OnInit
{
    public id: number;
    public recipeDetail: Recipe;
    public itemsAdded: boolean = false;

    constructor(private recipeService: RecipeService,
                private route: ActivatedRoute) { }

    ngOnInit(): void
    {
        this.route.params.subscribe((params: Params) =>
        {
            this.id = +params['id'];
            this.recipeDetail = this.recipeService.getRecipe(this.id);
        })
    }

    public onAddToShoppingList()
    {
        if (this.itemsAdded === false) 
        {
            this.recipeService.addIngredientsToList(this.recipeDetail.ingredients);
            this.itemsAdded = true;
        } 
        else
        {
            alert('This list of ingredients were added to the shopping list!');
        }
    }

}
