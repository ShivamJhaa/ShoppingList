import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthCompoenent } from "./auth/auth.component";
import { RecipeDetailtComponent } from "./recipes/recipe-detailt/recipe-detailt.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipes/recipe-resolver.service";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";

import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes',pathMatch: 'full'},
    {path: 'recipes', component: RecipesComponent, children: [
        {path: '',component: RecipeStartComponent},
        {path: 'new', component:RecipeEditComponent},
        {path: ':id', component:RecipeDetailtComponent, resolve: [RecipeResolverService]},
        {path: ':id/edit', component:RecipeEditComponent, resolve: [RecipeResolverService]},
    ]},
    {path: 'shopping-list', component: ShoppingListComponent},
    {path: 'auth',component: AuthCompoenent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}