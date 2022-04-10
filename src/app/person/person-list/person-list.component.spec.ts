import {
	HttpClientTestingModule,
	HttpTestingController
} from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { take } from "rxjs/operators";
import { TranslatePipe } from "../../pipes/translate/translate.pipe";
import { GenerationConfig } from "../generation-config";
import { Person } from "../person";
import { PersonGeneratorComponent } from "../person-generator/person-generator.component";
import { PersonService } from "../person.service";
import { PersonListComponent } from "./person-list.component";

describe("PersonListComponent", () => {
  let component: PersonListComponent;
  let fixture: ComponentFixture<PersonListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PersonListComponent,
        PersonGeneratorComponent,
        TranslatePipe,
      ],
      imports: [
        MatTableModule,
        MatCheckboxModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Should have a table with 5 Columns", () => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const tableTag = fixture.debugElement.query(By.css("table"));
      const columnsTag =
        tableTag.nativeElement.firstChild.firstElementChild.children;
      const columns = component.displayedColumns;

      expect(tableTag).toBeDefined();
      expect(columnsTag.length).toEqual(columns.length);
    });
  });

  it("Should have empty initial data", () => {
    const data: Person[] = component.dataSource;
    expect(data).toEqual([]);
  });

  it("Should update after request call", () => {
    const data: Person[] = component.dataSource;
    const config: GenerationConfig = {
      count: 100,
      male: true,
      female: true,
    };
    const service: PersonService = TestBed.get(PersonService);

    component.generate(config);
    httpMock.expectOne("/assets/data/persons.json");

    service.personsData$.pipe(take(1)).subscribe(() => {
      expect(data.length).toEqual(config.count);
    });

  });
});
