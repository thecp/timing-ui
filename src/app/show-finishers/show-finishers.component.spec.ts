import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFinishersComponent } from './show-finishers.component';

describe('ShowFinishersComponent', () => {
  let component: ShowFinishersComponent;
  let fixture: ComponentFixture<ShowFinishersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFinishersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFinishersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
