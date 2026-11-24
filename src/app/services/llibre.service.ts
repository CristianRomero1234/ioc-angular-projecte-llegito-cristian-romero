import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Service, inject, signal } from '@angular/core';
import { Observable, Subject, catchError, map, of, switchMap, tap } from 'rxjs';

import { adaptarLlibreApi, adaptarLlibresApi, llibreBuit, prepararLlibreApi } from '../adapter/llibre.adapter';
import { Llibre, LlibreApiResponse, EstatLlibres, NouElement } from '../models/llibre/llibre.model';
import { environment } from '../../environments/environment';

export interface CriterisCerca {
  terme: string;
  categoria: string; // '' = totes les categories
}

@Service()
export class LlibreService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/elements`;

  private readonly criterisInicials: CriterisCerca = { terme: '', categoria: '' };
  private readonly criteris$ = new Subject<CriterisCerca>();
  private darrersCriteris = this.criterisInicials;

  private readonly estatSignal = signal<EstatLlibres>({ estat: 'inicial', elements: [] });
  readonly estat = this.estatSignal.asReadonly();

  constructor() {
    this.criteris$
      .pipe(
        tap((criteris) => {
          this.darrersCriteris = criteris;
          this.estatSignal.set({ estat: 'carregant', elements: [] });
        }),

        switchMap((criteris) =>
          this.obtenirElements(criteris).pipe(
            map((elements): EstatLlibres => ({ estat: 'exit', elements })),
            catchError((error: HttpErrorResponse) =>
              of<EstatLlibres>({
                estat: 'error',
                elements: [],
                error: this.gestionarError(error),
              }),
            ),
          ),
        ),
      )
      .subscribe((estat) => this.estatSignal.set(estat));
  }

  carregarTot(): void {
    this.cercar(this.criterisInicials);
  }

  cercar(criteris: CriterisCerca): void {
    this.criteris$.next({
      terme: criteris.terme.trim(),
      categoria: criteris.categoria,
    });
  }

  reintentar(): void {
    this.criteris$.next(this.darrersCriteris);
  }

  crearElement(nou: NouElement): Observable<Llibre> {
    return this.http.post<LlibreApiResponse>(this.apiUrl, prepararLlibreApi(nou)).pipe(
      map(adaptarLlibreApi),
      tap(() => this.reintentar()),
    );
  }

  comptarResultats(terme: string): Observable<number> {
    return this.obtenirElements({ terme, categoria: '' }).pipe(map((elements) => elements.length));
  }

  private obtenirElements(criteris: CriterisCerca): Observable<Llibre[]> {
    let params = new HttpParams();
    if (criteris.categoria) {
      params = params.set('categoria', criteris.categoria);
    }

    return this.http.get<LlibreApiResponse[]>(this.apiUrl, { params }).pipe(
      map(adaptarLlibresApi),
      map((elements) => this.filtrarPerTerme(elements, criteris.terme)),
    );
  }

  private filtrarPerTerme(elements: Llibre[], terme: string): Llibre[] {
    const text = terme.trim().toLocaleLowerCase('ca');
    if (text.length < 3) {
      return elements;
    }
    return elements.filter((element) =>
      `${element.titol} ${element.descripcioBreu}`.toLocaleLowerCase('ca').includes(text),
    );
  }

  private gestionarError(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0:
        return "No es pot connectar amb l'API. Comproveu que npm run api està actiu.";
      case 404:
        return "Recurs no trobat. Verifiqueu la URL de l'API.";
      case 500:
        return 'Error intern del servidor.';
      default:
        return `Error inesperat (${error.status}): ${error.message}`;
    }
  }
}
