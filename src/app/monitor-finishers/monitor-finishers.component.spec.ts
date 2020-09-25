import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorFinishersComponent } from './monitor-finishers.component';

describe('MonitorFinishersComponent', () => {
  let component: MonitorFinishersComponent;
  let fixture: ComponentFixture<MonitorFinishersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorFinishersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorFinishersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
