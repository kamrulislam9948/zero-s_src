import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentCheduleAddComponent } from './installment-chedule-add.component';

describe('InstallmentCheduleAddComponent', () => {
  let component: InstallmentCheduleAddComponent;
  let fixture: ComponentFixture<InstallmentCheduleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstallmentCheduleAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstallmentCheduleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
