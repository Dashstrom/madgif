import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MadNavComponent } from './mad-nav.component';

describe('MadNavComponent', () => {
  let component: MadNavComponent;
  let fixture: ComponentFixture<MadNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MadNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MadNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
