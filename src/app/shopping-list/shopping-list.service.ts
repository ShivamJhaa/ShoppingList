import { Injectable,EventEmitter } from "@angular/core";
import { Ingredients } from "../shared/ingredient.model";

@Injectable()

export class ShoppingListService{

    ingredientsChanges = new EventEmitter<Ingredients[]>();
    private ingredients: Ingredients[] = [
        new Ingredients('Rice',5),
        new Ingredients('Tomato',15)
    ];
    getIngredient(){
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredients){
        this.ingredients.push(ingredient);
        this.ingredientsChanges.emit(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredients[]){
        // for(let ingredient of ingredients){
        //     this.addIngredient(ingredient);
        // }

        this.ingredients.push(...ingredients);
        this.ingredientsChanges.emit(this.ingredients.slice());
    }
}