import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';

@Component
({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy
{
    private subscription = new Subscription();
    public id: number;
    public editMode: boolean;
    public recipeForm: FormGroup;

    constructor(private route: ActivatedRoute,
                private recipeService: RecipeService) {

    }

    ngOnInit(): void
    {
        this.subscription.add(this.route.params.subscribe((params: Params) =>
        {
            this.id = +params['id'];
            this.editMode = params['id'] != null;
            this.initForm();
        }));

        if (this.editMode) this.loadRecipe();
    }

    ngOnDestroy(): void
    {
        this.subscription.unsubscribe();
    }

    public loadIngredients() {
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    private loadRecipe(): void
    {
        console.log('Loading Recipe: ', this.id);
    }

    private initForm(): void
    {
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        let recipeIngredients = new FormArray([]);

        if (this.editMode)
        {
            const recipe = this.recipeService.getRecipe(this.id);
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;

            if (recipe['ingredients'])
            {
                recipe.ingredients.forEach((ingredient: Ingredient) =>
                {
                    recipeIngredients.push(
                        new FormGroup(
                        {
                            'name': new FormControl(ingredient.name),
                            'amount': new FormControl(ingredient.amount)
                        })
                    );
                });
            }
        }

        this.recipeForm = new FormGroup(
        {
            'name': new FormControl(recipeName),
            'imagePath': new FormControl(recipeImagePath),
            'description': new FormControl(recipeDescription),
            'ingredients': recipeIngredients
        });
    }
}
