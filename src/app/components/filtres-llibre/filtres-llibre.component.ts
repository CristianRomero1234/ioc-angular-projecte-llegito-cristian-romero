import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtres-llibre',
  imports: [FormsModule],
  templateUrl: './filtres-llibre.component.html',
  styleUrl: './filtres-llibre.component.scss'
})
export class FiltresLlibreComponent {
  textCerca: string = '';
  categoriaSeleccionada: string = '';

  @Output() filtrar = new EventEmitter<{ text: string; categoria: string }>();
  @Output() restablir = new EventEmitter<void>();

  onApplyFilter() {
    this.filtrar.emit({ text: this.textCerca, categoria: this.categoriaSeleccionada });
  }

  onReset() {
    this.textCerca = '';
    this.categoriaSeleccionada = '';
    this.restablir.emit();
  }
}
