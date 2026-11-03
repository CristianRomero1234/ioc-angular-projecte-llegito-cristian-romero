import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EtiquetaEstatComponent } from './etiqueta-estat.component';

describe('EtiquetaEstatComponent', () => {
  let component: EtiquetaEstatComponent;
  let fixture: ComponentFixture<EtiquetaEstatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetaEstatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EtiquetaEstatComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
