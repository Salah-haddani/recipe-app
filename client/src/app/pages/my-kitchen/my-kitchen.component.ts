import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-my-kitchen',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './my-kitchen.component.html',
  styleUrl: './my-kitchen.component.css',
})
export class MyKitchenComponent implements OnInit {
  myRecipes: any[] = [];
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadMyRecipes();
  }

  loadMyRecipes() {
    const token = localStorage.getItem('access_token');
    const user_id = JSON.parse(atob(token!.split('.')[1])).sub;
    this.recipeService.getAllRecipes().subscribe((recipes) => {
      this.myRecipes = recipes.filter((r) => r.owner._id === user_id); //filter recipes where owner is the user logged in
    });
  }
  editRecipe(recipe: any) {}
  deleteRecipe(id: string) {}
}
