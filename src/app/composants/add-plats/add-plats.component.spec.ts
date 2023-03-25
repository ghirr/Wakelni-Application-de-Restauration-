import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlatsComponent } from './add-plats.component';

describe('AddPlatsComponent', () => {
  let component: AddPlatsComponent;
  let fixture: ComponentFixture<AddPlatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPlatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
