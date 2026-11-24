export interface Llibre {
  id: string;
  titol: string;
  descripcioBreu: string;
  categoria: string;
  dataAdquisicio: Date;
  numeroPagines: number;
  isDestacat?: boolean;
  imatge: string;
}

export interface LlibreApiResponse {
  id: string;
  titol: string;
  descripcioBreu: string;
  categoria: string;
  numeroPagines: number;
  destacat?: boolean;
  imatge: string;
}

export interface LlibreCercaResponse {
  llibres: LlibreApiResponse[];
  total: number;
}

export type EstatServei = 'inicial' | 'carregant' | 'exit' | 'error';

export interface EstatLlibres {
  estat: EstatServei;
  elements: Llibre[];
  error?: string;
}

export interface CercaDesada {
  terme: string;
  categoria: string;
  data: string;
}

export interface Preferit {
  elementId: string;
  elementNom: string;
  notes: string[];
  dataAfegit: string;
}

export type NouElement = Pick<Llibre, 'titol' | 'descripcioBreu' | 'categoria' | 'numeroPagines' | 'imatge'>;