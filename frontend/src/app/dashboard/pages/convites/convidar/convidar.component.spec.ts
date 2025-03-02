import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvidarComponent } from './convidar.component';

describe('ConvidarComponent', () => {
  let component: ConvidarComponent;
  let fixture: ComponentFixture<ConvidarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvidarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConvidarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
