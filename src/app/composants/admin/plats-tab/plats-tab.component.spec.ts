import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatsTabComponent } from './plats-tab.component';

describe('PlatsTabComponent', () => {
  let component: PlatsTabComponent;
  let fixture: ComponentFixture<PlatsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
