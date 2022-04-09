import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { PersonGeneratorComponent } from "./person-generator.component";

describe("PersonGeneratorComponent", () => {
  let component: PersonGeneratorComponent;
  let fixture: ComponentFixture<PersonGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonGeneratorComponent],
      imports: [
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(`should have a title tag h3 with text 'Critères de génération :'`, () => {
    const tagText = fixture.debugElement.query(By.css("h3")).nativeElement
      .textContent;

    expect(tagText).toContain("Critères de génération :");
  });

  it("should have a form", () => {
    const tagNumber = fixture.debugElement.queryAll(By.css("form")).length;

    expect(tagNumber).toBe(1);
  });

  it("should have initial criteria values & should update them", () => {
    const mockForm = fixture.debugElement.query(By.css("form"));
    // COUNT //
    const mockFormInput = mockForm.query(By.css("input")).nativeElement;
    // check initial value
    expect(parseInt(mockFormInput.value)).toEqual(1000);
    mockFormInput.value = 500;
    mockFormInput.dispatchEvent(new Event("input"));
    // check update value
    expect(fixture.componentInstance.generatorForm.get("count").value).toEqual(
      500
    );

    // GENDER //
    const mockFormMaleCheckbox = mockForm.queryAll(By.css("mat-checkbox"))[0]
      .nativeElement.firstChild.firstChild.firstChild;
    const mockFormFemaleCheckbox = mockForm.queryAll(By.css("mat-checkbox"))[1]
      .nativeElement.firstChild.firstChild.firstChild;
    // check initial value
    expect(mockFormMaleCheckbox.checked).toEqual(true);
    expect(mockFormFemaleCheckbox.checked).toEqual(true);

    mockFormMaleCheckbox.checked = false;
    mockFormFemaleCheckbox.checked = false;

    mockFormMaleCheckbox.dispatchEvent(new Event("input"));
    mockFormFemaleCheckbox.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // check update value
      //   expect(fixture.componentInstance.generatorForm.get("male").value).toEqual(false);
      //   expect(fixture.componentInstance.generatorForm.get("female").value).toEqual(false);
    });
  });

  it("should check form validation", () => {
    const mockForm = fixture.debugElement.query(By.css("form"));
    const mockFormInput = mockForm.query(By.css("input")).nativeElement;
    const mockFormButton = fixture.debugElement.query(
      By.css("button")
    ).nativeElement;

    // Initially, form is valid
    expect(mockFormButton.disabled).toEqual(false);
    expect(fixture.componentInstance.isFormInvalid()).toEqual(false);

    // Invalidity check
    mockFormInput.value = -1;
    mockFormInput.dispatchEvent(new Event("input"));
    expect(fixture.componentInstance.isFormInvalid()).toEqual(true);
    mockFormInput.value = 2500;
    mockFormInput.dispatchEvent(new Event("input"));
    expect(fixture.componentInstance.isFormInvalid()).toEqual(true);

    fixture.componentInstance.generatorForm = new FormGroup({
      count: new FormControl(1000),
      male: new FormControl(false),
      female: new FormControl(false),
    });
    fixture.detectChanges();
    expect(mockFormButton.disabled).toEqual(true);
  });

  it("should send criterias data to generate", () => {
    const mockButton = fixture.debugElement.query(
      By.css("button")
    ).nativeElement;

    const generateFunctionMock = spyOn(component, "generate");

    expect(mockButton.disabled).toEqual(false);

    mockButton.click();
    expect(generateFunctionMock).toHaveBeenCalledTimes(1);
  });
});
