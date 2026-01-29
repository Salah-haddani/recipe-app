import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-my-kitchen',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './my-kitchen.component.html',
  styleUrl: './my-kitchen.component.css',
})
export class MyKitchenComponent implements OnInit {
  myRecipes: any[] = [];
  recipeForm: FormGroup;
  isEditing = false;
  currentRecipeId: string | null = null;

  constructor(private recipeService: RecipeService, private fb: FormBuilder) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      ingredients: ['', Validators.required], // Will split by ','
      instructions: ['', Validators.required],
    });
  }

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
  onSubmit() {
    if (this.recipeForm.invalid) return;
    const recipeData = {
      ...this.recipeForm.value,
      ingredients: this.recipeForm.value.ingredients
        .split(',')
        .map((i: string) => i.trim()),
    };
    if (this.isEditing && this.currentRecipeId) {
      this.recipeService
        .updateRecipe(this.currentRecipeId, recipeData)
        .subscribe(() => {
          this.resetForm();
          this.loadMyRecipes();
        });
    } else {
      this.recipeService.createRecipe(recipeData).subscribe(() => {
        this.resetForm();
        this.loadMyRecipes();
      });
    }
  }

  editRecipe(recipe: any) {
    this.isEditing = true;
    this.currentRecipeId = recipe._id;
    this.recipeForm.patchValue({
      title: recipe.title,
      ingredients: recipe.ingredients.join(', '),
      instructions: recipe.instructions,
    });
  }
  deleteRecipe(id: string) {
    console.log('Deleting recipe:', id);
    this.recipeService.deleteRecipe(id).subscribe(() => this.loadMyRecipes());
  }
  resetForm() {
    this.isEditing = false;
    this.currentRecipeId = null;
    this.recipeForm.reset();
  }
}
