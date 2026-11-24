import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CriterisCerca, LlibreService } from '../../services/llibre.service';
import { termeAmbResultatsValidator } from '../../validators/terme-amb-resultats.validator';

import { HistorialCerquesService } from '../../services/historial-cerques.service';
import { CercaDesada } from '../../models/llibre/llibre.model';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-formulari-cerca',
  styleUrl: './formulari-cerca.component.scss',
  templateUrl: './formulari-cerca.component.html',
})
export class FormulariCercaComponent {
  private readonly llibreService = inject(LlibreService);
  readonly historial = inject(HistorialCerquesService);

  @Output() cercaEnviada = new EventEmitter<CriterisCerca>();

  readonly categories = ['Wishlist', 'Llegit', 'Pendent'];

  readonly formulari = new FormGroup({
    terme: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(3)],
      asyncValidators: [termeAmbResultatsValidator(this.llibreService)],
    }),
    categoria: new FormControl('', { nonNullable: true }),
  });

  enviar(): void {
    if (this.formulari.invalid) {
      this.formulari.markAllAsTouched();
      return;
    }
    const criteris = this.formulari.getRawValue();
    this.historial.desar(criteris.terme, criteris.categoria); // ← desa la cerca confirmada
    this.emetre();
  }

  recuperar(cerca: CercaDesada): void {
    this.formulari.patchValue({ terme: cerca.terme, categoria: cerca.categoria });
    this.enviar();
  }
  
  netejar(): void {
    this.formulari.reset();
    this.emetre();
  }

  private emetre(): void {
    this.cercaEnviada.emit(this.formulari.getRawValue());
  }

  get terme(): FormControl<string> {
    return this.formulari.controls.terme;
  }

  get mostrarErrors(): boolean {
    return this.terme.invalid && (this.terme.dirty || this.terme.touched);
  }

  get missatgeError(): string {
    if (this.terme.hasError('minlength')) {
      return 'Escriviu 3 caràcters com a mínim.';
    }
    if (this.terme.hasError('senseResultats')) {
      return 'Cap element coincideix amb aquest terme.';
    }
    return '';
  }
}
