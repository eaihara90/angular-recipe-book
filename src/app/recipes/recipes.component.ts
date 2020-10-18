import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { transition, style, animate, trigger } from '@angular/animations';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';


@Component
({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
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

export class RecipesComponent implements OnInit
{

    public recipeItem: Recipe;

    constructor() { }

    ngOnInit(): void { }

}
