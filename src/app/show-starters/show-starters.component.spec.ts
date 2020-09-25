import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStartersComponent } from './show-starters.component';

describe('ShowStartersComponent', () => {
  let component: ShowStartersComponent;
  let fixture: ComponentFixture<ShowStartersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStartersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStartersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
