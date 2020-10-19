import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';


@Component
({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit
{
    
    constructor(private dataStorageService: DataStorageService) {}

    ngOnInit() {}

    public onSaveData(): void {
        this.dataStorageService.storeRecipes();
    }

    public onFetchData(): void {
        this.dataStorageService.fetchRecipes().subscribe();
    }
}