import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredients[] = [];
  private igChengeSub: Subscription;

  constructor(private slService : ShoppingListService) { }
  ngOnDestroy(): void {
   this.igChengeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredient();
    this.igChengeSub = this.slService.ingredientsChanges.subscribe(
      (ingredients: Ingredients[])=>{
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }
  

}
