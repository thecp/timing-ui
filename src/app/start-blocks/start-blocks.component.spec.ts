import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartBlocksComponent } from './start-blocks.component';

describe('StartBlocksComponent', () => {
  let component: StartBlocksComponent;
  let fixture: ComponentFixture<StartBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StartBlocksComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
