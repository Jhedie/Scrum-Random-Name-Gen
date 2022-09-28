import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameDeleteComponent } from './name-delete.component';

describe('NameDeleteComponent', () => {
  let component: NameDeleteComponent;
  let fixture: ComponentFixture<NameDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
