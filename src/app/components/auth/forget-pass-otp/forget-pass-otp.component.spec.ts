import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPassOtpComponent } from './forget-pass-otp.component';

describe('ForgetPassOtpComponent', () => {
  let component: ForgetPassOtpComponent;
  let fixture: ComponentFixture<ForgetPassOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgetPassOtpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgetPassOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
