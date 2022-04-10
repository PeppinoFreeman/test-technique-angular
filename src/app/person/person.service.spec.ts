import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Person } from "./person";
import { PersonService } from "./person.service";

const PERSONS: Person[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "REESE",
    email: "john@reese.com",
    gender: "Male",
  },
  {
    id: 2,
    firstName: "Harold",
    lastName: "FINCH",
    email: "harold@finch.com",
    gender: "Male",
  },
  {
    id: 3,
    firstName: "Joss",
    lastName: "CARTER",
    email: "joss@carter.com",
    gender: "Female",
  },
];

const DEFAULT_CONFIG = {
  count: 3,
  male: true,
  female: true,
};

const NO_MALE_CONFIG = {
  count: 3,
  male: false,
  female: true,
};

const NO_FEMALE_CONFIG = {
  count: 3,
  male: true,
  female: false,
};

const EMPTY_CONFIG = {
  count: 3,
  male: false,
  female: false,
};

describe("PersonService", () => {
  let httpMock: HttpTestingController;
  let service: PersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(PersonService);
  });

  afterEach(() => httpMock.verify());

  it("should create", () => {
    expect(service).toBeTruthy();
  });

  it("should provide a list of 3 persons", () => {
    service.generatePersonsRequest(DEFAULT_CONFIG);

    service.personsData$.subscribe((persons: Person[]) => {
      expect(persons).toBeDefined();
      expect(persons.length).toBe(DEFAULT_CONFIG.count);
      expect(persons.map((p) => p.id)).toEqual([1, 2, 3]);
    });

    // Call to the resource `persons.json` is not real, only sample `PERSONS` is returned for fake
    const getPersons = httpMock.expectOne("/assets/data/persons.json");
    getPersons.flush(PERSONS);
  });

  it("should provide a list of males only", () => {
    service.generatePersonsRequest(NO_FEMALE_CONFIG);

    service.personsData$.subscribe((persons: Person[]) => {
      expect(persons).toBeDefined();
      expect(persons.length).toBe(2);
      expect(persons.map((p) => p.id)).toEqual([1, 2]);
    });

    // Call to the resource `persons.json` is not real, only sample `PERSONS` is returned for fake
    const getPersons = httpMock.expectOne("/assets/data/persons.json");
    getPersons.flush(PERSONS);
  });

  it("should provide a list of females only", () => {
    service.generatePersonsRequest(NO_MALE_CONFIG);

    service.personsData$.subscribe((persons: Person[]) => {
      expect(persons).toBeDefined();
      expect(persons.length).toBe(1);
      expect(persons.map((p) => p.id)).toEqual([3]);
    });

    // Call to the resource `persons.json` is not real, only sample `PERSONS` is returned for fake
    const getPersons = httpMock.expectOne("/assets/data/persons.json");
    getPersons.flush(PERSONS);
  });

  it("should provide an empty list", () => {
    service.generatePersonsRequest(EMPTY_CONFIG);

    service.personsData$.subscribe((persons: Person[]) => {
      expect(persons).toEqual([]);
      expect(persons.length).toBe(0);
    });

    // Call to the resource `persons.json` is not real, only sample `PERSONS` is returned for fake
    const getPersons = httpMock.expectOne("/assets/data/persons.json");
    getPersons.flush(PERSONS);
  });
});
