import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({ providedIn: 'root'})
export class AuthService {
    
    constructor(private http: HttpClient) { }

    public signUp(_email: string, _password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(`${this.apiUrl}${this.webApiKey}`,
        {
            email: _email, password: _password, returnSecureToken: true
        });
    }
}