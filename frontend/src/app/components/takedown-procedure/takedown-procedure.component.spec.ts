import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakedownProcedureComponent } from './takedown-procedure.component';

describe('TakedownProcedureComponent', () => {
  let component: TakedownProcedureComponent;
  let fixture: ComponentFixture<TakedownProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakedownProcedureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TakedownProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
