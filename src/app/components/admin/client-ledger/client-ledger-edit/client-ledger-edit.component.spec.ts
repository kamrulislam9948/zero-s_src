import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLedgerEditComponent } from './client-ledger-edit.component';

describe('ClientLedgerEditComponent', () => {
  let component: ClientLedgerEditComponent;
  let fixture: ComponentFixture<ClientLedgerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientLedgerEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientLedgerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
