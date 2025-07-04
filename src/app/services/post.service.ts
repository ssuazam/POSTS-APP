import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, throwError, map } from 'rxjs';

// Interfaz que representa un post del API
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root' // hace que el servicio esté disponible globalmente
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los posts desde la API.   
   */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl).pipe(
      delay(500), 
      catchError(error => {
        console.error('Error al obtener los posts', error);
        return throwError(() => new Error('No se pudieron cargar los posts.'));
      })
    );
  }

  /**
   * Busca posts por título, filtrando en frontend.  
   */
  getPostsBySearch(search: string): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl).pipe(
      delay(500), 
      catchError(error => {
        console.error('Error al obtener los posts filtrados', error);
        return throwError(() => new Error('No se pudieron filtrar los posts.'));
      }),
      map(posts =>
        posts.filter(post =>
          post.title.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }
}
