import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailtComponent } from './recipe-detailt.component';

describe('RecipeDetailtComponent', () => {
  let component: RecipeDetailtComponent;
  let fixture: ComponentFixture<RecipeDetailtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeDetailtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
