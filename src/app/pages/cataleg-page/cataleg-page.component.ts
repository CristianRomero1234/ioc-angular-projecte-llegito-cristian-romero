import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CriterisCerca, LlibreService } from '../../services/llibre.service';
import { FormulariCercaComponent } from '../../components/formulari-cerca/formulari-cerca.component';
import { PreferitsPanelComponent } from '../../components/preferits-panel/preferits-panel.component';
import { PreferitsService } from '../../services/preferits.service';
import { Llibre } from '../../models/llibre/llibre.model';
import { FormulariNouElementComponent } from '../../components/formulari-nou-element/formulari-nou-element.component';

@Component({
  imports: [DatePipe, FormulariCercaComponent, PreferitsPanelComponent, FormulariNouElementComponent],
  selector: 'app-cataleg-page',
  styleUrl: './cataleg-page.component.scss',
  templateUrl: './cataleg-page.component.html',
})
export class CatalegPageComponent implements OnInit {
  readonly llibreService = inject(LlibreService);
  readonly preferitsService = inject(PreferitsService);

  ngOnInit(): void {
    this.llibreService.carregarTot();
  }

  onCerca(criteris: CriterisCerca): void {
    this.llibreService.cercar(criteris);
  }

  reintentar(): void {
    this.llibreService.reintentar();
  }
  togglePreferit(element: Llibre): void {
    if (this.preferitsService.esPreferit(element.id)) {
      this.preferitsService.eliminarPreferit(element.id);
    } else {
      this.preferitsService.afegirPreferit(element.id, element.titol);
    }
  }
}
