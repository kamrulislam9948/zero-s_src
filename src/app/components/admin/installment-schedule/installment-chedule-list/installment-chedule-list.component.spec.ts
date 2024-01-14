import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentCheduleListComponent } from './installment-chedule-list.component';

describe('InstallmentCheduleListComponent', () => {
  let component: InstallmentCheduleListComponent;
  let fixture: ComponentFixture<InstallmentCheduleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstallmentCheduleListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstallmentCheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
