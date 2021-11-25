import { Component, EventEmitter, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('nameAmountInput') nameAmountInputRef: ElementRef;


  constructor(private slService : ShoppingListService) { }

  ngOnInit(): void {
  }
  addIngredient(){
    const inName = this.nameInputRef.nativeElement.value; 
    const inAmount = this.nameAmountInputRef.nativeElement.value; 
    const newIngredients = new Ingredients(inName,inAmount);
    this.slService.addIngredient(newIngredients);
  }

}
