import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefsTabsComponent } from './chefs-tabs.component';

describe('ChefsTabsComponent', () => {
  let component: ChefsTabsComponent;
  let fixture: ComponentFixture<ChefsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefsTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChefsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
