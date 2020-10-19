import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    private apiUrl: string = 'https://ng-complete-guide-82dc8.firebaseio.com/';

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    public storeRecipes(): void {
        const recipes = this.recipeService.getRecipes();

        this.http.put(`${this.apiUrl}recipes.json`, recipes).subscribe(response => console.log(response));
    }

    public fetchRecipes() {
        return  this.http.get(`${this.apiUrl}recipes.json`).pipe(
                map((recipes: Recipe[]) =>
                {
                    return recipes.map((recipe: Recipe) =>
                    {
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                    })
                }),
                tap((recipes: Recipe[]) =>
                {
                    this.recipeService.setRecipes(recipes)
                })); 
    }
}
