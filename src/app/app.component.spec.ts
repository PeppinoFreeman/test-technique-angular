import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterLinkWithHref } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule.withRoutes([])],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });

  it("should render title in a h1 tag", () => {
    const titleTag = fixture.debugElement.query(By.css("h1")).nativeElement;
    expect(titleTag.textContent).toContain("Test technique Angular");
  });

  it("should have a link 'À propos' with navigation", () => {
    const linkTag = fixture.debugElement.query(By.css("a"));
    const routerLinkInstance = linkTag.injector.get(RouterLinkWithHref);

    expect(linkTag.nativeElement.textContent).toContain("À propos");
    expect(routerLinkInstance.href).toEqual("/apropos");
  });
});
