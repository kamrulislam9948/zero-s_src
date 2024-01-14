import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryEditComponent } from './transaction-history-edit.component';

describe('TransactionHistoryEditComponent', () => {
  let component: TransactionHistoryEditComponent;
  let fixture: ComponentFixture<TransactionHistoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionHistoryEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionHistoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
