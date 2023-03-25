import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBookedComponent } from './table-booked.component';

describe('TableBookedComponent', () => {
  let component: TableBookedComponent;
  let fixture: ComponentFixture<TableBookedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableBookedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableBookedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
