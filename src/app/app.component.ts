import { Component } from '@angular/core';

@Component
({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent
{
    title = 'project';

    currentPage: string;

    changePage(page: string)
    {
        this.currentPage = page;
    }
}
