import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLandingInfoComponent } from './home-landing-info.component';

describe('HomeLandingInfoComponent', () => {
  let component: HomeLandingInfoComponent;
  let fixture: ComponentFixture<HomeLandingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeLandingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLandingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
