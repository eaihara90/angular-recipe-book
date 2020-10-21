import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListRouting } from './shopping-list.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations:[
        ShoppingEditComponent,
        ShoppingListComponent
    ],
    imports: [
        FormsModule,
        RouterModule,
        ShoppingListRouting,
        SharedModule
    ]
})
export class ShoppingListModule { }