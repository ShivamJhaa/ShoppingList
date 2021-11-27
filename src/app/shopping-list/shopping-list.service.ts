import { Injectable,EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredients } from "../shared/ingredient.model";

@Injectable()

export class ShoppingListService{

    ingredientsChanges = new Subject<Ingredients[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredients[] = [
        new Ingredients('Rice',5),
        new Ingredients('Tomato',15)
    ];
    getIngredient(){
        return this.ingredients.slice();
    }
    getEditIngredient(index: number){
        return this.ingredients[index];
    }
    addIngredient(ingredient: Ingredients){
        this.ingredients.push(ingredient);
        this.ingredientsChanges.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredients[]){
        // for(let ingredient of ingredients){
        //     this.addIngredient(ingredient);
        // }

        this.ingredients.push(...ingredients);
        this.ingredientsChanges.next(this.ingredients.slice());
    }
    upgradeIngredients(index: number, newIngredinet: Ingredients){
        this.ingredients[index]= newIngredinet;
        this.ingredientsChanges.next(this.ingredients.slice());
    }
}