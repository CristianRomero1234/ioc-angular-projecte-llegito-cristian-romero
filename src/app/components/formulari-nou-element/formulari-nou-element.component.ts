import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { LlibreService } from '../../services/llibre.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-formulari-nou-element',
  styleUrl: './formulari-nou-element.component.scss',
  templateUrl: './formulari-nou-element.component.html',
})
export class FormulariNouElementComponent {
  private readonly llibreService = inject(LlibreService);

  readonly categories = [
    'Electrònica',
    'Sensors',
    'Motors',
    'Pantalles',
    'Comunicació',
    'Components',
    'Prototipatge',
    'Il·luminació',
  ];

  readonly formulari = new FormGroup({
    titol: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    descripcioBreu: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
    categoria: new FormControl('Components', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    numeroPagines: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    imatge: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  readonly enviant = signal(false);
  readonly missatge = signal<string | null>(null);
  readonly error = signal<string | null>(null);

  crear(): void {
    if (this.formulari.invalid) {
      this.formulari.markAllAsTouched();
      return;
    }

    this.enviant.set(true);
    this.missatge.set(null);
    this.error.set(null);

    this.llibreService.crearElement(this.formulari.getRawValue()).subscribe({
      next: (llibre) => {
        this.missatge.set(`S'ha creat "${llibre.titol}" amb l'identificador ${llibre.id}.`);
        this.formulari.reset();
        this.enviant.set(false);
      },
      error: () => {
        this.error.set("No s'ha pogut crear l'element. Comproveu que l'API està activa.");
        this.enviant.set(false);
      },
    });
  }

  teError(control: 'titol' | 'descripcioBreu' | 'categoria' | 'numeroPagines' | 'imatge'): boolean {
    const c = this.formulari.controls[control];
    return c.invalid && (c.dirty || c.touched);
  }
}
