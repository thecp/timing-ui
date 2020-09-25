import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorStartersComponent } from './monitor-starters.component';

describe('MonitorStartersComponent', () => {
  let component: MonitorStartersComponent;
  let fixture: ComponentFixture<MonitorStartersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorStartersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorStartersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
