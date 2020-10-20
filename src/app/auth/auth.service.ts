import { Injectable, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from './user.model';
import { AuthResponseData } from './auth-response-data.interface';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class AuthService {

    public user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private apiService: ApiService, private router: Router) { }


    public signUp(_email: string, _password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(`${this.apiService.signupUrl()}${this.apiService.apiKey()}`,
        {
            email: _email,
            password: _password,
            returnSecureToken: true

        }).pipe(catchError(this.handleError), tap(this.handleAuthentication));
    }


    public login(_email: string, _password: string): Observable<AuthResponseData> 
    {
        return this.http.post<AuthResponseData>(`${this.apiService.loginUrl()}${this.apiService.apiKey()}`,
        {
            email: _email,
            password: _password,
            returnSecureToken: true

        }).pipe(catchError(this.handleError), tap((response: AuthResponseData) => this.handleAuthentication(response)));
    }

    public logout(): void {
        console.log('[LOGOUT]');
        
        this.user.next(null);

        this.router.navigate(['/auth']);

        localStorage.removeItem('userData');

        if (this.tokenExpirationTimer)
        {
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;
    }

    public autologin(): void
    {

        const userData = JSON.parse(localStorage.getItem('userData'));
        
        if (!userData) return;

        const { email, id, _token, _tokenExpirationDate } = userData;

        const loadedUser = new User(email, id, _token, new Date(_tokenExpirationDate));

        if (loadedUser.token)
        {
            this.user.next(loadedUser);

            const expiresIn = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();

            this.autoLogout(expiresIn);
        }
    }

    private autoLogout(expirationTime: number): void
    {
        this.tokenExpirationTimer = setTimeout(() => this.logout(), expirationTime);
    }

    private handleAuthentication(authResponseData: AuthResponseData)
    {
        const { email, localId, idToken, expiresIn } = authResponseData;

        const expirationDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000);

        const user = new User(email, localId, idToken, expirationDate);

        this.user.next(user);

        this.autoLogout(parseInt(expiresIn, 10) * 1000);

        localStorage.setItem('userData', JSON.stringify(user));
    }


    private handleError(errorResponse: HttpErrorResponse)
    {
        console.log(errorResponse);
        
        let errorMessage = null;

        if (!errorResponse.error || !errorResponse.error.error)
        {
            return throwError(errorMessage);
        }

        switch(errorResponse.error.error.message)
        {
            case 'EMAIL_EXISTS':
                errorMessage = 'E-mail already submitted to sign up!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There was an error! Check your e-mail and/or password!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'There was an error! Check your e-mail and/or password!';
                break;
            case 'USER_DISABLED':
                errorMessage = 'There was an error! Check your e-mail and/or password!';
                break;
            default:
                errorMessage ='An unkown error occurred!';
        }

        return throwError(errorMessage);
    }
}