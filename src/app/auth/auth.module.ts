import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';
import { AuthRouting } from './auth.routing';

@NgModule({
    declarations: [AuthComponent],
    imports: [AuthRouting, FormsModule, SharedModule],
    exports: []
})
export class AuthModule { }