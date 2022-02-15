import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ImageCreditComponent } from "./image-credit.component";

describe("ImageCreditComponent", () => {
  let component: ImageCreditComponent;
  let fixture: ComponentFixture<ImageCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageCreditComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
