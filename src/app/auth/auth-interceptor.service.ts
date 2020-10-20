import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { exhaustMap, take } from 'rxjs/operators';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        return this.authService.user.pipe(
        take(1),
        exhaustMap((user: User) =>
        {
            if(!user)
            {
                return next.handle(req);
            }

            const authReq = req.clone(
            {
                params: new HttpParams().set('auth', user.token)
            });

            return next.handle(authReq);
        }));
    }
}