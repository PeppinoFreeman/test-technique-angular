import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { PersonGeneratorComponent } from "../person-generator/person-generator.component";

import { PersonListComponent } from "./person-list.component";

describe("PersonListComponent", () => {
	let component: PersonListComponent;
	let fixture: ComponentFixture<PersonListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				PersonListComponent,
				PersonGeneratorComponent
			],
			imports: [
				MatTableModule,
				MatCheckboxModule,
				MatInputModule,
				MatButtonModule,
				ReactiveFormsModule,
				HttpClientTestingModule,
				NoopAnimationsModule
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PersonListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
