import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit
{
    @ViewChild('nameInput', ) nameInputRef: ElementRef;
    @ViewChild('amountInput') amountInputRef: ElementRef;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit(): void {}

    onAddIngredient()
    {   
        if (this.nameInputRef.nativeElement.value && this.amountInputRef.nativeElement.value)
        {
            const ingredient = new Ingredient
            (
                this.nameInputRef.nativeElement.value,
                parseInt(this.amountInputRef.nativeElement.value)
            );
            
            this.shoppingListService.addNewIngredient(ingredient);
            
            this.resetFields();
        }
        else 
        {
            alert('Enter product name and amount!');
        }
    }

    resetFields()
    {
        this.nameInputRef.nativeElement.value = '';
        this.amountInputRef.nativeElement.value = '';
        this.nameInputRef.nativeElement.focus();
    }

}
