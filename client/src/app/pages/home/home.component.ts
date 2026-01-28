import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  recipes: any[] = [];
  constructor(private recipeService: RecipeService) {}
  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe({
      next: (data) => (this.recipes = data),
      error: (err) => console.error('could not load recipes', err),
    });
  }
}
