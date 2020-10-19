import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';


@Component
({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy
{
    public isAuthenticated: boolean = false;
    private subscription = new Subscription();

    constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

    ngOnInit(): void
    {
        this.subscription.add(this.authService.user.subscribe((user: User) =>
        {
            this.isAuthenticated = !!user;
            console.log(user);
            console.log(!user);
            console.log(!!user);
        }));
    }

    ngOnDestroy(): void
    {
        this.subscription.unsubscribe();
    }

    public onSaveData(): void {
        this.dataStorageService.storeRecipes();
    }

    public onFetchData(): void {
        this.dataStorageService.fetchRecipes().subscribe();
    }
}