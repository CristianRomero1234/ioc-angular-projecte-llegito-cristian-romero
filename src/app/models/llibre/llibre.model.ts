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

export interface EstatElements {
  estat: EstatServei;
  elements: Llibre[];
  error?: string;
}