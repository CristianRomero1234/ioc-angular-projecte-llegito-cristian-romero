export interface Llibre {
  id: number;
  titol: string;
  descripcioBreu: string;
  categoria: 'Wishlist' | 'Llegit' | 'Pendent';
  dataAdquisicio: string;
  numeroPagines: number;
  isDestacat?: boolean;
}