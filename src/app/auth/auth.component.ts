import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
    private subscription = new Subscription();
    public isLoginMode = true;
    public isLoading = false;
    public error: string = null;
    
    constructor(private authService: AuthService) { }

    ngOnInit(): void { }
    
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public onSubmit(form: NgForm): void {
        if (!form.valid) {
            return;
        }

        this.isLoading = !this.isLoading;
        if (this.isLoginMode) {

        } else {
            const email = form.value.email;
            const password = form.value.password;

            this.subscription.add(this.authService.signUp(email, password).subscribe((response: AuthResponseData) =>
            {
                console.log(response);
                this.isLoading = !this.isLoading;
            },
            error =>
            {
                console.error(error);
                this.error = 'An error occurred';
                this.isLoading = !this.isLoading;
            }));
        }

        form.reset();
    }

    public onSwitchMode(): void {
        this.isLoginMode = !this.isLoginMode;
    }
}