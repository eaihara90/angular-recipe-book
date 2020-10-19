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

    ingredients: Ingredient[] = [];

    constructor() {}
    
    ngOnInit() {}

    public getShoppingList(): Ingredient[] {
        return this.ingredients.slice();
    }

    public getIngredient(index: number): Ingredient {
        return this.ingredients[index];
    }

    public addNewIngredient(newIngredient: Ingredient) {
        this.ingredients.push(newIngredient);
        this.updateView();
    }

    public addIngredients(ingredients: Ingredient[]) {
        ingredients.forEach(ingredient => this.ingredients.push(ingredient));
        this.updateView();
    }

    public deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    public updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    public updateView()
    {
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}