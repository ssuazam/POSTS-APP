import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../services/post.service';

@Pipe({
  name: 'orderBy',
  standalone: true
})
export class OrderByPipe implements PipeTransform {

  /**
   * Ordena una lista de posts por el campo y orden especificados.
   * @param posts Lista de posts a ordenar.
   * @param order 'asc' para ascendente, 'desc' para descendente.
   * @param field Campo por el cual ordenar (id, title, userId).
   * @returns Lista ordenada de posts.
   */
  transform(posts: Post[], order: 'asc' | 'desc', field: keyof Post): Post[] {
    if (!posts) return [];

    // Usamos spread operator para evitar mutar el arreglo original
    return [...posts].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      // Comparación de strings (caso: title)
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // Comparación de números (caso: id, userId)
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }

      // En caso de tipos no esperados (por seguridad)
      return 0;
    });
  }
}
