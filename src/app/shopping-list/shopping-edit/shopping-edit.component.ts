import { Component, EventEmitter, ElementRef, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredients } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription : Subscription;
  editMode : boolean = false;
  editedItemIndex: number;
  editIngredient: Ingredients;

  constructor(private slService : ShoppingListService) { }
  @ViewChild('f',{static: false}) slForm: NgForm;
  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index:number) => {
          this.editMode =true;
          this.editedItemIndex = index;
          this.editIngredient = this.slService.getEditIngredient(index);
          this.slForm.setValue({
            name: this.editIngredient.name,
            amount : this.editIngredient.amount
          })
        }
      );
  }
  onSubmit(form : NgForm){
    const value = form.value;
    const newIngredients = new Ingredients(value.name,value.amount);
    if(this.editMode){
      this.slService.upgradeIngredients(this.editedItemIndex,newIngredients);
    }
    else{
      this.slService.addIngredient(newIngredients);
    }
    this.editMode=false;
    form.reset();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
