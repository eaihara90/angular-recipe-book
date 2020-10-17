import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable
({
    providedIn: 'root'
})

export class ShoppingListService implements OnInit
{   
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

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

    getIngredient(index: number): Ingredient {
        return this.ingredients[index];
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

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateView()
    {
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}