import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltresLlibreComponent } from './filtres-llibre.component';

describe('FiltresLlibreComponent', () => {
  let component: FiltresLlibreComponent;
  let fixture: ComponentFixture<FiltresLlibreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltresLlibreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltresLlibreComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
