import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = 'http://localhost:3000/recipes';
  constructor(private http: HttpClient) {}

  getAllRecipes(
    page: number,
    limit: number,
    sort: string,
    ownerId?: string
  ): Observable<any> {
    let params = `?page=${page}&limit=${limit}&sort=${sort}`;
    if (ownerId) params += `&ownerId=${ownerId}`;
    return this.http.get<any>(`${this.apiUrl}${params}`);
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
