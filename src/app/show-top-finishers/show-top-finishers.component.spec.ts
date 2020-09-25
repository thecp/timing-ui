import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTopFinishersComponent } from './show-top-finishers.component';

describe('ShowTopFinishersComponent', () => {
  let component: ShowTopFinishersComponent;
  let fixture: ComponentFixture<ShowTopFinishersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTopFinishersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTopFinishersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
