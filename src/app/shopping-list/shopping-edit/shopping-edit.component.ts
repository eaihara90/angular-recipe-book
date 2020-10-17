import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy
{
    private subscription = new Subscription();
    public editMode = false;
    private editedItemIndex: number;
    private editedItem: Ingredient;

    @ViewChild('form', { static: false }) shoppingListForm: NgForm;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit(): void
    {
        this.subscription.add(this.shoppingListService.startedEditing.subscribe((index: number) => 
        {
            this.editedItemIndex = index;
            this.toggleEditMode();
            this.editedItem = this.shoppingListService.getIngredient(index);
            
            this.shoppingListForm.setValue(
            {
                name: this.editedItem.name,
                amount: this.editedItem.amount
            });
        }));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public onSubmit(form: NgForm)
    {   
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);

        if (this.editMode)
        {
            this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
            this.toggleEditMode();
        }
        else
        {
            this.shoppingListService.addNewIngredient(newIngredient);
        }

        this.resetFields();
    }

    public onDelete(): void
    {
        this.onClear();
        this.shoppingListService.deleteIngredient(this.editedItemIndex);
    }

    public onClear(): void
    {
        if (this.editMode)
        {
            this.toggleEditMode();
        }

        this.resetFields();
    }

    private resetFields()
    {
        this.shoppingListForm.reset();
    }

    private toggleEditMode(): void {
        this.editMode = !this.editMode;
    }

}
