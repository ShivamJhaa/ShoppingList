import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredients } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Biryani',
    //     'This is chicken biryani',
    //     'https://i.ytimg.com/vi/BCKMeHuRX0I/maxresdefault.jpg',
    //     [
    //         new Ingredients("Chicken",1), 
    //         new Ingredients("French Fries",50)
    //     ]
    //     ),
    //     new Recipe('Biryani',
    //     'This is Veg biryani',
    //     'https://i.ytimg.com/vi/BCKMeHuRX0I/maxresdefault.jpg',
    //     [
    //         new Ingredients("Buns",5),
    //         new Ingredients("Chutney",12)
    //     ])
    // ];
    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) {}
    getRecipes(){
        return this.recipes.slice();
    }

    addIngredientToShopping(ingredients : Ingredients[]){
        this.slService.addIngredients(ingredients);
    }
    getRecipe(index: number) {
        return this.recipes[index];
    }
    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index]= newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}