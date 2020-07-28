import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable
({
    providedIn: 'root'
})

export class ShoppingListService implements OnInit
{   
    ingredientsChanged = new EventEmitter<Ingredient[]>();

    ingredients: Ingredient[] =
    [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatos', 10)
    ];

    constructor() {}
    
    ngOnInit() {}

    getShoppingList(): Ingredient[]
    {
        return this.ingredients.slice();
    }

    addNewIngredient(newIngredient: Ingredient)
    {
        this.ingredients.push(newIngredient);
        this.updateView();
    }

    addIngredients(ingredients: Ingredient[])
    {
        ingredients.forEach(ingredient => this.ingredients.push(ingredient));
        this.updateView();
    }

    updateView()
    {
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}