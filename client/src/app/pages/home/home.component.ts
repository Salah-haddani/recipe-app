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
  constructor(
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe({
      next: (data) => (this.recipes = data),
      error: (err) => console.error('could not load recipes', err),
    });
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
