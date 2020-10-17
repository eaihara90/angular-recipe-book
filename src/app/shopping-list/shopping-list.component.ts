import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { transition, style, animate, trigger } from '@angular/animations';

@Component
({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss'],
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
export class ShoppingListComponent implements OnInit {
    
    ingredients: Ingredient[];

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit(): void
    {
        this.ingredients = this.shoppingListService.getShoppingList();

        this.shoppingListService.ingredientsChanged.subscribe(
            (ingredients: Ingredient[]) => this.ingredients = ingredients
        );
    }

    onEditItem(index: number) {
        this.shoppingListService.startedEditing.next(index);
    }
}
