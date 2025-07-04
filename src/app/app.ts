import { Component } from '@angular/core';
import { PostListComponent } from './components/post-list.component';

@Component({
  selector: 'app-root',
  standalone: true, // 👈 esto también falta si estás usando standalone
  imports: [PostListComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected title = 'posts-app';
}
