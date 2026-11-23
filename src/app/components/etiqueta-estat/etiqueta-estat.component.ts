import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-etiqueta-estat',
  imports: [],
  templateUrl: './etiqueta-estat.component.html',
  styleUrl: './etiqueta-estat.component.scss'
})
export class EtiquetaEstatComponent {
  @Input({ required: true }) categoria!: string;
}