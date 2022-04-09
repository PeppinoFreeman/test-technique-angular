import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterLinkWithHref } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AboutComponent } from "./about.component";

describe("AboutComponent", () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent],
      imports: [RouterTestingModule.withRoutes([])],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should contains two p tags with texts", () => {
    const paragraphTags = fixture.debugElement.queryAll(By.css("p"));
    expect(paragraphTags.length).toEqual(2);
    expect(paragraphTags[0].nativeElement.textContent).toContain(
      `Ce test technique a pour objectif de valider les compétences Angular du Candidat.`
    );
    expect(paragraphTags[1].nativeElement.textContent).toContain("Retour");
  });

  it("should have a link 'Retour' with navigation", () => {
    const linkTag = fixture.debugElement.query(By.css("a"));
    const routerLinkInstance = linkTag.injector.get(RouterLinkWithHref);

    expect(linkTag.nativeElement.textContent).toContain("Retour");
    expect(routerLinkInstance.href).toEqual("/");
  });
});
