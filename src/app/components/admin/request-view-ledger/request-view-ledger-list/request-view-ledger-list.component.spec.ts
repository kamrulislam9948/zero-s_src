import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestViewLedgerListComponent } from './request-view-ledger-list.component';

describe('RequestViewLedgerListComponent', () => {
  let component: RequestViewLedgerListComponent;
  let fixture: ComponentFixture<RequestViewLedgerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestViewLedgerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestViewLedgerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
