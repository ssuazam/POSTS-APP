// Importaciones principales de Angular y módulos necesarios
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService, Post } from '../services/post.service';
import { FormsModule } from '@angular/forms';
import { OrderByPipe } from '../pipes/order-by-pipe';

// Importaciones de RxJS para manejo reactivo
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  of,
  catchError,
  map,
} from 'rxjs';

@Component({
  selector: 'app-post-list', // Selector usado en el HTML
  standalone: true, // Standalone component, no necesita declararse en un módulo
  imports: [CommonModule, FormsModule, OrderByPipe], // Módulos y pipes que el componente necesita
  templateUrl: './post-list.component.html', // Ruta al archivo HTML del componente
})
export class PostListComponent implements OnInit {
  // Datos crudos obtenidos del servicio
  posts: Post[] = [];

  // Datos filtrados por búsqueda y filtros
  filteredPosts: Post[] = [];

  // Estados de carga y error
  loading = false;
  error = '';

  // Valor actual del texto de búsqueda
  searchText = '';

  // Filtro actual por User ID
  userIdFilter?: number;

  // Orden de los resultados: ascendente o descendente
  sortOrder: 'asc' | 'desc' = 'asc';

  // Campo por el que se ordenan los resultados
  sortField: 'title' | 'id' | 'userId' = 'title';

  // Post seleccionado para mostrar en el modal
  selectedPost: Post | null = null;

  // Controla si se muestran los filtros en vista móvil
  showMobileFilters = false;

  // Subjects que emiten cambios para búsqueda y filtro
  private searchTextSubject = new BehaviorSubject<string>(''); // Reactivo al input de búsqueda
  private userIdFilterSubject = new BehaviorSubject<number | undefined>(undefined); // Reactivo al filtro por userId

  constructor(
    private postService: PostService, // Servicio para obtener los datos
    private cdr: ChangeDetectorRef // Permite forzar la detección de cambios
  ) {}

  ngOnInit(): void {
    this.loading = true;

    // Combina búsqueda y filtro de userId
    combineLatest([
      this.searchTextSubject.pipe(debounceTime(300), distinctUntilChanged()),
      this.userIdFilterSubject.pipe(distinctUntilChanged()),
    ])
      .pipe(
        // switchMap cancela la petición anterior si llega una nueva entrada
        switchMap(([search, userId]) =>
          this.postService.getPostsBySearch(search).pipe(
            catchError(err => {
              // Manejo de errores en la llamada a la API
              this.error = 'Error al obtener los posts: ' + err.message;
              this.loading = false;
              this.cdr.detectChanges();
              return of([]); // Devuelve arreglo vacío si falla
            }),
            map(posts => {
              // Aplica el filtro por userId de forma local
              return userId
                ? posts.filter(post => post.userId === userId)
                : posts;
            })
          )
        )
      )
      .subscribe(posts => {
        // Al obtener resultados, se asignan a los arrays locales
        this.posts = posts;
        this.filteredPosts = posts;
        this.loading = false;
        this.cdr.detectChanges(); // Fuerza redibujo
      });

    // Dispara carga inicial con búsqueda vacía
    this.searchTextSubject.next('');
  }

  // Maneja cambios en el input de búsqueda
  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchText = value;
    this.loading = true;
    this.searchTextSubject.next(value);
  }

  // Maneja cambios en el filtro por User ID
  onUserIdChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const userId = input.value ? parseInt(input.value, 10) : undefined;
    this.userIdFilter = userId;
    this.loading = true;
    this.userIdFilterSubject.next(userId);
  }

  // Alterna el orden entre ascendente y descendente
  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  // Selecciona un post para mostrar en el modal
  selectPost(post: Post): void {
    this.selectedPost = post;
  }

  // Cierra el modal
  closePost(): void {
    this.selectedPost = null;
  }

  // Devuelve true si la pantalla es menor a 1000px (para filtros móviles)
  get screenIsSmall(): boolean {
    return window.innerWidth < 1000;
  }
}
