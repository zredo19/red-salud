import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component'; // <-- IMPORTANTE

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent // <-- AÑADIR ESTO
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css' // <-- Vamos a añadir estilos aquí
})
export class AppComponent {}
