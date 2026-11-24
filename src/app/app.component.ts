// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';
// import { Llibre } from './models/llibre/llibre.model';
// import { LLIBRES_MOCK } from './data/llibre/llibres.mock';
// import { ListaLlibresComponent } from './components/lista-llibres/lista-llibres.component';
// import { FiltresLlibreComponent } from './components/filtres-llibre/filtres-llibre.component';

// @Component({
//   selector: 'app-root',
//   imports: [CommonModule, RouterOutlet, ListaLlibresComponent, FiltresLlibreComponent],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss'
// })
// export class App {
//   nomAplicacio = 'Llegito - Gestor de Lectures';
//   llibres: Llibre[] = LLIBRES_MOCK;
//   llibresFiltrats: Llibre[] = LLIBRES_MOCK;
//   llibreSeleccionat?: Llibre;

//   aplicarFiltres(filtre: { text: string; categoria: string }) {
//     this.llibresFiltrats = this.llibres.filter(llibre => {
//       const matchText = llibre.titol.toLowerCase().includes(filtre.text.toLowerCase());
//       const matchCat = filtre.categoria ? llibre.categoria === filtre.categoria : true;
//       return matchText && matchCat;
//     });
//   }

//   restablirFiltres() {
//     this.llibresFiltrats = [...this.llibres];
//     this.llibreSeleccionat = undefined;
//   }

//   seleccionarLlibre(llibre: Llibre) {
//     this.llibreSeleccionat = llibre;
//   }
// }

import { Component, OnInit, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { LlibreService } from './services/llibre.service';
import { CatalegPageComponent } from './pages/cataleg-page/cataleg-page.component';

@Component({
  imports: [JsonPipe, CatalegPageComponent],
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