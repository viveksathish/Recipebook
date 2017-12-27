import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";


@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();

   private recipes: Recipe[] = [
        new Recipe(
            'Khara Bhath', 
            'A Super tasty khara bhath-just awesome', 'https://www.archanaskitchen.com//images/archanaskitchen/1-Author/Smitha_Kalluraya/khara-bhath-recipe-south-indian-rava-bhath.jpg',
            [
                new Ingredient('Rava-bowl', 1),
                new Ingredient('Vegetables', 5)
            ]
        ),

        new Recipe(
            'Egg Masala', 
            'What else you need to say?', 'http://i.ndtvimg.com/i/2015-06/indian-dinner_625x350_51434362664.jpg',
            [
                new Ingredient('Egg', 3),
                new Ingredient('Masala-items', 8)
            ]
        )
      ];

      constructor(private slService: ShoppingListService) {

      }

     setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
     }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }   

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice()); 
     }

    deleteRecipe(index: number) {
         this.recipes.splice(index, 1); 
        this.recipeChanged.next(this.recipes.slice()); 
     }

}

 