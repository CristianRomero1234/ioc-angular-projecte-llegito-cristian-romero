import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Llibre } from '../../models/llibre/llibre.model';
import { LlibreComponent } from '../llibre/llibre.component';

@Component({
  selector: 'app-lista-llibres',
  imports: [CommonModule, LlibreComponent],
  templateUrl: './lista-llibres.component.html',
  styleUrl: './lista-llibres.component.scss'
})
export class ListaLlibresComponent {
  @Input({ required: true }) llibres: Llibre[] = [];
  @Input() llibreSeleccionat?: Llibre;

  @Output() seleccionar = new EventEmitter<Llibre>();

  onSeleccionar(llibre: Llibre) {
    this.seleccionar.emit(llibre);
  }
}