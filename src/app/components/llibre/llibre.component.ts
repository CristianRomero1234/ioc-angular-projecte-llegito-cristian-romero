import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Llibre } from '../../models/llibre/llibre.model';
import { EtiquetaEstatComponent } from '../etiqueta-estat/etiqueta-estat.component';

@Component({
  selector: 'app-llibre',
  imports: [DatePipe, EtiquetaEstatComponent],
  templateUrl: './llibre.component.html',
  styleUrl: './llibre.component.scss'
})
export class LlibreComponent {
  @Input({ required: true }) llibre!: Llibre;
  @Input() seleccionat: boolean = false;
  @Output() seleccionar = new EventEmitter<Llibre>();

  onSelect() {
    this.seleccionar.emit(this.llibre);
  }
}