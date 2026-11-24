import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Preferit } from '../../models/llibre/llibre.model';
import { PreferitsService } from '../../services/preferits.service';

@Component({
  imports: [ReactiveFormsModule, DatePipe],
  selector: 'app-preferits-panel',
  styleUrl: './preferits-panel.component.scss',
  templateUrl: './preferits-panel.component.html',
})
export class PreferitsPanelComponent {
  readonly preferitsService = inject(PreferitsService);

  readonly preferitSeleccionat = signal<Preferit | null>(null);

  readonly formulariNotes = new FormGroup({
    notes: new FormArray<FormControl<string>>([]),
  });

  get notes(): FormArray<FormControl<string>> {
    return this.formulariNotes.controls.notes;
  }

  seleccionarPreferit(preferit: Preferit): void {
    this.preferitSeleccionat.set(preferit);
    this.notes.clear();
    // Un control per cada nota existent...
    for (const nota of preferit.notes) {
      this.notes.push(this.nouControl(nota));
    }
    this.notes.push(this.nouControl(''));
  }

  afegirNota(): void {
    const ultim = this.notes.at(this.notes.length - 1);
    if (!ultim || ultim.invalid) {
      ultim?.markAsTouched();
      return;
    }
    this.notes.push(this.nouControl(''));   // el camp que era "nou" passa a ser una nota més
    this.desar();
  }

  eliminarNota(index: number): void {
    this.notes.removeAt(index);
    this.desar();
  }

  eliminarPreferit(elementId: string): void {
    this.preferitsService.eliminarPreferit(elementId);
    if (this.preferitSeleccionat()?.elementId === elementId) {
      this.tancarPanel();
    }
  }

  tancarPanel(): void {
    this.preferitSeleccionat.set(null);
    this.notes.clear();
  }

  private desar(): void {
    const preferit = this.preferitSeleccionat();
    if (!preferit) return;
    const notes = this.notes.getRawValue().slice(0, -1).map((n) => n.trim()).filter((n) => n.length > 0);
    this.preferitsService.desarNotes(preferit.elementId, notes);
    this.preferitSeleccionat.set(this.preferitsService.obtenirPreferit(preferit.elementId) ?? null);
  }

  private nouControl(valor: string): FormControl<string> {
    return new FormControl(valor, { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] });
  }
}