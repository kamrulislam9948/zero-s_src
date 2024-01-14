import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLedgerAddComponent } from './client-ledger-add.component';

describe('ClientLedgerAddComponent', () => {
  let component: ClientLedgerAddComponent;
  let fixture: ComponentFixture<ClientLedgerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientLedgerAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientLedgerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
