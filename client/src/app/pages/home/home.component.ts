import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatCardModule, RouterLink, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  recipes: any[] = [];
  totalRecipes = 0;
  currentPage = 1;
  pageSize = 6; // 6 recipes for each page
  currentSort = 'desc';
  constructor(
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.loadRecipes();
  }
  loadRecipes(): void {
    this.recipeService
      .getAllRecipes(this.currentPage, this.pageSize, this.currentSort)
      .subscribe({
        next: (data) => {
          this.recipes = data.recipes;
          this.totalRecipes = data.total;
          console.log('output - recipes', this.recipes);
          console.log('output - totalRecipes', this.totalRecipes);
        },
        error: (err) => console.error('could not load recipes', err),
      });
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
    this.loadRecipes();
  }

  toggleSort(): void {
    this.currentSort = this.currentSort === 'desc' ? 'asc' : 'desc';
    this.currentPage = 1; // Reset to first page
    this.loadRecipes();
  }
  isPublisher(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) return false;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role === 'publisher';
  }
  logout() {
    this.authService.logout();
  }
}
