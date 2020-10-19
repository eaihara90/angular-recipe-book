import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponseData } from './auth-response-data.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
    private subscription = new Subscription();
    public isLoginMode = true;
    public isLoading = false;
    public error: string = null;
    
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void { }
    
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public onSubmit(form: NgForm): void
    {
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        let authObservable: Observable<AuthResponseData>;

        this.isLoading = !this.isLoading;

        if (this.isLoginMode)
        {
            authObservable = this.authService.login(email, password);
        }
        else
        {
            authObservable = this.authService.signUp(email, password);
        }

        this.subscription.add(authObservable.subscribe((response: AuthResponseData) =>
        {
            this.isLoading = !this.isLoading;
            
            this.router.navigate(['/recipes']);
        },
        errorResponse =>
        {
            this.error = errorResponse;
            this.isLoading = !this.isLoading;
        }));

        form.reset();
    }

    public onSwitchMode(): void {
        this.isLoginMode = !this.isLoginMode;
    }
    
}