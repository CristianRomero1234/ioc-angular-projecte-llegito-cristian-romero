import { Llibre, LlibreApiResponse, NouElement } from '../models/llibre/llibre.model';

const CATEGORIES_NORMALITZADES: Record<string, string> = {
  wishlist: 'Wishlist',
  llegit: 'Llegit',
  pendent: 'Pendent',
};

function normalitzarCategoria(categoria: string | undefined): string {
  const neta = (categoria ?? '').trim();
  return CATEGORIES_NORMALITZADES[neta.toLocaleLowerCase()] ?? neta;
}

const IMATGE_PER_DEFECTE = 'https:placehold.co/300x200?text=Sense+imatge';

function numeroSegur(valor: unknown, perDefecte = 0): number {
  const n = Number(valor);
  return Number.isFinite(n) ? n : perDefecte;
}

export function adaptarLlibreApi(llibreApi: LlibreApiResponse): Llibre {
  return {
    id: String(llibreApi.id),
    titol: llibreApi.titol || '',
    descripcioBreu: llibreApi.descripcioBreu || '',
    categoria: normalitzarCategoria(llibreApi.categoria) || '',
    numeroPagines: numeroSegur(llibreApi.numeroPagines),
    isDestacat: llibreApi.destacat || false,
    imatge: llibreApi.imatge || IMATGE_PER_DEFECTE,
    dataAdquisicio: new Date(),
  };
}

export function adaptarLlibresApi(llibresApi: LlibreApiResponse[]): Llibre[] {
  return llibresApi.map(adaptarLlibreApi);
}

export function llibreBuit(): Llibre {
  return {
    id: '',
    titol: '',
    descripcioBreu: '',
    categoria: '',
    dataAdquisicio: new Date(),
    numeroPagines: 0,
    isDestacat: false,
    imatge: IMATGE_PER_DEFECTE,
  };
}

 export function prepararLlibreApi(nou: NouElement): Omit<LlibreApiResponse, 'id'> {
   return {
     titol: nou.titol.trim(),
     descripcioBreu: nou.descripcioBreu.trim(),
     categoria: nou.categoria,
     numeroPagines: Number(nou.numeroPagines) || 0,
     imatge: `https://placehold.co/300x200?text=${encodeURIComponent(nou.titol.trim())}`,
     destacat: false,  
   };
 }
