import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable
({
    providedIn: 'root'
})

export class ShoppingListService implements OnInit
{   
    onNewIngredient = new EventEmitter<Ingredient>();

    ingredients: Ingredient[] =
    [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatos', 10)
    ];

    constructor() {}
    
    ngOnInit() {}

    getShoppingList(): Ingredient[]
    {
        return this.ingredients;
    }

    addNewIngredient(newIngredient: Ingredient)
    {
        this.ingredients.push(newIngredient);
        console.log(this.ingredients);
    }
}