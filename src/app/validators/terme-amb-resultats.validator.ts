import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of, switchMap, timer } from 'rxjs';
import { LlibreService } from '../services/llibre.service';

/**
 * Validador asíncron: el terme ha de coincidir amb algun element de l'API.
 * Error retornat: { senseResultats: true }
 */
export function termeAmbResultatsValidator(elementService: LlibreService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const terme = (control.value ?? '').toString().trim();

    if (terme.length < 3) {
      return of(null);
    }

    return timer(1400).pipe(
      switchMap(() => elementService.comptarResultats(terme)),
      map((total) => (total > 0 ? null : { senseResultats: true })),
      catchError(() => of(null))  
    );
  };
}