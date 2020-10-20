import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from './user.model';
import { AuthResponseData } from './auth-response-data.interface';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { apiKeys } from '../../api.env'

@Injectable({ providedIn: 'root'})
export class AuthService {
    private signupUrl: string = apiKeys.signupUrl;
    private loginUrl: string = apiKeys.loginUrl;
    private webApiKey: string = apiKeys.webApiKey;

    public user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient) { }

    public signUp(_email: string, _password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(this.signupUrl+this.webApiKey,
        {
            email: _email,
            password: _password,
            returnSecureToken: true

        }).pipe(catchError(this.handleError), tap(this.handleAuthentication));
    }

    public login(_email: string, _password: string): Observable<AuthResponseData> 
    {
        return this.http.post<AuthResponseData>(this.loginUrl+this.webApiKey,
        {
            email: _email,
            password: _password,
            returnSecureToken: true

        }).pipe(catchError(this.handleError), tap((response: AuthResponseData) => this.handleAuthentication(response)));
    }

    private handleAuthentication(authResponseData: AuthResponseData)
    {
        const { email, localId, idToken, expiresIn } = authResponseData;

        const expirationDate = new Date(new Date().getTime() + parseInt(expiresIn) * 1000 );

        const user = new User(email, localId, idToken, expirationDate);

        this.user.next(user);
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