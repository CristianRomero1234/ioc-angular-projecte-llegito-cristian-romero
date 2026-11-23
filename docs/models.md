# Models i adaptadors

## Interfícies principals

### Llibre

Model utilitzat dins l'aplicació Angular:

```typescript
interface Llibre {
  id: string;
  titol: string;
  descripcioBreu: string;
  categoria: string;
  dataAdquisicio: Date;
  numeroPagines: number;
  isDestacat?: boolean;
  imatge: string;
}
```

### LlibreApiResponse (resposta API)

Format de les dades que retorna l'API:

```typescript
interface LlibreApiResponse {
  id: string;
  titol: string;
  descripcioBreu: string;
  categoria: string;
  numeroPagines: number;
  destacat?: boolean;
  imatge: string;
}
```

## Adaptadors

### adaptarLlibreApi()

Transforma un llibre de l'API al format intern:

- Canvia `isDestacat` → `destacat`
- Afegeix `dataAdquisicio` amb data actual
- Manté la resta de camps

### adaptarLlibresApi()

Aplica `adaptarLlibreApi()` a un array d'llibres.

### llibreBuit()

Retorna un llibre amb valors per defecte per inicialitzar formularis.

## Mapeig de camps

| Camp API | Camp intern | Transformació |
|----------|-------------|---------------|
| `id` | `id` | Conversió a `string` |
| `titol` | `titol` | `trim()` |
| `descripcioBreu` | `descripcioBreu` | `trim()` |
| `categoria` | `categoria` | `trim()` + normalització a català |
| `numeroPagines` | `numeroPagines` | `Number()` segur (0 si no és vàlid) |
| `imatge` | `imatge` | `trim()` + valor per defecte si és buit |
| `destacat` | `isDestacat` | Renombrat, `=== true` |
| — | `dataAdquisicio` | Adquisicio (Date actual) |