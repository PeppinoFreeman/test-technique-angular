import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Person } from "./person";

import { PersonService } from "./person.service";

const PERSONS: Person[] = [
	{
		id: 1,
		firstName: "John",
		lastName: "REESE",
		email: "john@reese.com",
		gender: "Male"
	},
	{
		id: 2,
		firstName: "Harold",
		lastName: "FINCH",
		email: "harold@finch.com",
		gender: "Male"
	},
	{
		id: 3,
		firstName: "Joss",
		lastName: "CARTER",
		email: "joss@carter.com",
		gender: "Female"
	}
];

const DEFAULT_CONFIG = {
	count: 3,
	male: true,
	female: true
};

describe("PersonService", () => {
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
		httpMock = TestBed.get(HttpTestingController);
	});

	afterEach(() => httpMock.verify());

	it("should provide a list of 3 persons", () => {
		const service: PersonService = TestBed.get(PersonService);
		expect(service).toBeTruthy();

		const persons$ = service.getPersons(DEFAULT_CONFIG);
		persons$.subscribe(persons => {
			expect(persons).toBeDefined();
			expect(persons.length).toBe(1);
			expect(persons.map(p => p.id)).toEqual([1, 2, 3]);
		});

		// Call to the resource `persons.json` is not real, only sample `PERSONS` is returned for fake
		const getPersons = httpMock.expectOne("/assets/data/persons.json");
		getPersons.flush(PERSONS);
	});
});
