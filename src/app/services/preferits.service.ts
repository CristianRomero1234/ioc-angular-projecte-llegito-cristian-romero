import { Service, signal } from '@angular/core';
import { Preferit } from '../models/llibre/llibre.model';

@Service()
export class PreferitsService {
  private readonly clauStorage = 'cataleg-preferits';
  private readonly preferitsSignal = signal<Preferit[]>(this.llegir());

  readonly preferits = this.preferitsSignal.asReadonly();

  afegirPreferit(elementId: string, elementNom: string): void {
    if (this.esPreferit(elementId)) {
      return;
    }
    const nou: Preferit = { elementId, elementNom, notes: [], dataAfegit: new Date().toISOString() };
    this.preferitsSignal.update((preferits) => [...preferits, nou]);
    this.escriure();
  }

  eliminarPreferit(elementId: string): void {
    this.preferitsSignal.update((preferits) => preferits.filter((p) => p.elementId !== elementId));
    this.escriure();
  }

  /** Substitueix totes les notes d'un preferit (les rep del FormArray) */
  desarNotes(elementId: string, notes: string[]): void {
    this.preferitsSignal.update((preferits) =>
      preferits.map((p) => (p.elementId === elementId ? { ...p, notes: [...notes] } : p))
    );
    this.escriure();
  }

  esPreferit(elementId: string): boolean {
    return this.preferitsSignal().some((p) => p.elementId === elementId);
  }

  obtenirPreferit(elementId: string): Preferit | undefined {
    return this.preferitsSignal().find((p) => p.elementId === elementId);
  }

  private llegir(): Preferit[] {
    try {
      const dades = localStorage.getItem(this.clauStorage);
      const preferits: unknown = dades ? JSON.parse(dades) : [];
      if (!Array.isArray(preferits)) {
        return [];
      }
      return preferits.filter((p): p is Preferit =>
        typeof p?.elementId === 'string' &&
        typeof p?.elementNom === 'string' &&
        Array.isArray(p?.notes) &&
        typeof p?.dataAfegit === 'string'
      );
    } catch {
      return [];
    }
  }

  private escriure(): void {
    try {
      localStorage.setItem(this.clauStorage, JSON.stringify(this.preferitsSignal()));
    } catch {
      // Sense persistència, els preferits duren fins que es tanca la pestanya
    }
  }
}