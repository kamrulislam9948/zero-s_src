import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentCheduleEditComponent } from './installment-chedule-edit.component';

describe('InstallmentCheduleEditComponent', () => {
  let component: InstallmentCheduleEditComponent;
  let fixture: ComponentFixture<InstallmentCheduleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstallmentCheduleEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstallmentCheduleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
