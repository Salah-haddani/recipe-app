import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecipeDetailsComponent } from './pages/recipe-details/recipe-details.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'recipes/:id',
    component: RecipeDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-kitchen',
    component: RecipeDetailsComponent,
    canActivate: [AuthGuard],
    data: { role: 'publisher' },
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
