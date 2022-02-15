import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MadFooterComponent } from "./mad-footer.component";

describe("MadFooterComponent", () => {
  let component: MadFooterComponent;
  let fixture: ComponentFixture<MadFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MadFooterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MadFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
