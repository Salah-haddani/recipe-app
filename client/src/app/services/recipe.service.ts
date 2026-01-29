import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = 'http://localhost:3000/recipes';
  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getRecipeById(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}`);
  }
  createRecipe(recipe: any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl, recipe);
  }
  updateRecipe(id: string, recipe: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}/${id}`, recipe);
  }
  deleteRecipe(id: string): Observable<any[]> {
    return this.http.delete<any[]>(`${this.apiUrl}/${id}`);
  }
}
