import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})

export class DataStorageService{
    constructor( private recipeService: RecipeService,
        private http : HttpClient,
        private authService: AuthService){}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(
            'https://recipe-list-e3987-default-rtdb.firebaseio.com/recipes.json',recipes)
            .subscribe(response => {
                
            })
    }

    fetcRecipes(){
        return this.http.get<Recipe[]>(
            'https://recipe-list-e3987-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe,ingredients: recipe.ingredients? recipe.ingredients : []
                };
            });
             
        }),
        tap(recipes =>{
            this.recipeService.setRecipes(recipes); 
        }))

        }
}