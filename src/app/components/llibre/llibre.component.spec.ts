import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LlibreComponent } from './llibre.component';

describe('LlibreComponent', () => {
  let component: LlibreComponent;
  let fixture: ComponentFixture<LlibreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlibreComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LlibreComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
