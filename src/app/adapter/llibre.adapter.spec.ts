import { adaptarLlibreApi, adaptarLlibresApi } from './llibre.adapter';
import { LlibreApiResponse } from '../models/llibre/llibre.model';

describe('adaptarLlibreApi', () => {
  const apiLlibre: LlibreApiResponse = {
    id: 'test-id-001',
    titol: 'llibre de prova',
    descripcioBreu: 'descripció de prova',
    categoria: 'Pendent',
    numeroPagines: 600,
    destacat: true,
    imatge: 'https://placehold.co/300x200?text=El+món+de+Sofia',
  };
  it('canvia el nom del camp destacat a isDestacat', () => {
    const adaptat = adaptarLlibreApi(apiLlibre);
    expect(adaptat.isDestacat).toBe(true);
  });
  it('normalitza el titol, la descripcioBreu, i la categoria a string', () => {
    const adaptat = adaptarLlibreApi(apiLlibre);
    expect(adaptat.titol).toBe('llibre de prova');
    expect(adaptat.descripcioBreu).toBe('descripció de prova');
    expect(adaptat.categoria).toBe('Pendent');
  });
  it('converteix els nombres buits o no vàlids a 0', () => {
    const adaptat = adaptarLlibreApi({ ...apiLlibre, numeroPagines: NaN });
    expect(adaptat.numeroPagines).toBe(0);
  });
  it('adapta un array complet', () => {
    expect(adaptarLlibresApi([apiLlibre, { ...apiLlibre, id: 'test-id-002' }])).toHaveLength(2);
  });
});
