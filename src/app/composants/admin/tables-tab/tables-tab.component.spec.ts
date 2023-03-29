import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesTabComponent } from './tables-tab.component';

describe('TablesTabComponent', () => {
  let component: TablesTabComponent;
  let fixture: ComponentFixture<TablesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablesTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
