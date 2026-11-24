## FormulariCercaComponent

| Control | Validacions | Missatge |
|---|---|---|
| `terme` | `minLength(3)` (síncrona), `termeAmbResultatsValidator` (asíncrona, amb `timer(400)` + `switchMap`) | "Escriviu 3 caràcters com a mínim." / "Cap element coincideix amb aquest terme." |
| `categoria` | cap | — |

- Cerca explícita amb el botó "Cercar" o Retorn (`ngSubmit`), només si el formulari és vàlid
- Els missatges només es mostren quan el control és `dirty` o `touched`
- El botó d'enviar es deshabilita si el formulari és `invalid` o `pending`
- Sortida: `@Output() cercaEnviada: EventEmitter<CriterisCerca>`

## PreferitsPanelComponent

### Funcionalitat
Component amb `FormArray` dinàmic per gestionar les notes de cada preferit, amb persistència a `localStorage`.

### FormArray dinàmic
```typescript
formulariNotes = new FormGroup({
  notes: new FormArray<FormControl<string>>([]),   // array de controls que creix i decreix
});
```

**Comportament:**
1. En seleccionar un preferit, es reconstrueix el `FormArray`: un control per nota existent + un control buit
2. "Afegir nota" consolida el camp buit (si és vàlid) i n'afegeix un altre
3. La ✕ elimina el control amb `removeAt(i)`
4. Cada canvi es persisteix amb `PreferitsService.desarNotes()`

### Validacions
| Camp | Validació | Efecte |
|---|---|---|
| Cada nota | `required`, `minLength(3)` | Vora vermella en tocar el camp; botó "Afegir nota" deshabilitat |

### Mètodes principals
- `seleccionarPreferit()`: reconstrueix el `FormArray` a partir de les notes desades
- `afegirNota()`: valida l'últim control, n'afegeix un de nou i desa
- `eliminarNota(i)`: `removeAt(i)` i desa
- `desar()` (privat): `getRawValue()` sense l'últim camp → servei