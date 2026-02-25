import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SocketService } from '../../services/socket.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-recipe-details',
  imports: [
    CommonModule,
    RouterLink,
    CardModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent implements OnInit {
  recipe: any;
  isUpdating = false;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private authService: AuthService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService
        .getRecipeById(id)
        .subscribe((data) => (this.recipe = data));
    }
    this.socketService.onStatusChange().subscribe((data) => {
      if (data.recipeId === this.recipe._id) {
        this.isUpdating = true;

        setTimeout(() => {
          this.recipe.isAvailable = data.isAvailable;
          this.isUpdating = false;
        }, 3000); // 3-second delay
      }
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
