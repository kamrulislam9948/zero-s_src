import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryAddComponent } from './transaction-history-add.component';

describe('TransactionHistoryAddComponent', () => {
  let component: TransactionHistoryAddComponent;
  let fixture: ComponentFixture<TransactionHistoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionHistoryAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionHistoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
