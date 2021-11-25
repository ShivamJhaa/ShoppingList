import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detailt',
  templateUrl: './recipe-detailt.component.html',
  styleUrls: ['./recipe-detailt.component.css']
})
export class RecipeDetailtComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onAddToShopping(){
    this.recipeService.addIngredientToShopping(this.recipe.ingredients);
  }

}
