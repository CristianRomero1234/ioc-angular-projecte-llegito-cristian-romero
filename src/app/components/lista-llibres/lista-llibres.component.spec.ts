import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaLlibresComponent } from './lista-llibres.component';

describe('ListaLlibresComponent', () => {
  let component: ListaLlibresComponent;
  let fixture: ComponentFixture<ListaLlibresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaLlibresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaLlibresComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
