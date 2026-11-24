
import { RouterOutlet } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { LlibreService } from './services/llibre.service';
import { CatalegPageComponent } from './pages/cataleg-page/cataleg-page.component';

@Component({
  imports: [JsonPipe, RouterOutlet, CatalegPageComponent],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App implements OnInit {
  readonly llibreService = inject(LlibreService);

  ngOnInit(): void {
    this.llibreService.carregarTot();
  }
}