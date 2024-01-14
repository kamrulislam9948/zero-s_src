import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLedgerListComponent } from './client-ledger-list.component';

describe('ClientLedgerListComponent', () => {
  let component: ClientLedgerListComponent;
  let fixture: ComponentFixture<ClientLedgerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientLedgerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientLedgerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
