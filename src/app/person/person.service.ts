import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { GenerationConfig } from "./generation-config";
import { Person } from "./person";

@Injectable({
  providedIn: "root",
})
export class PersonService {
  private _personsSource = new Subject<Person[]>();
  readonly personsData$ = this._personsSource.asObservable();

  constructor(private http: HttpClient) {}

  generatePersonsRequest(config: GenerationConfig): void {
    const persons$ = this.http.get<Person[]>("/assets/data/persons.json");

    persons$.subscribe((data) => {
      let counter = 0;
      const fitleredPersons: Person[] = data.filter((item) => {
        if (
          this.filterByGender(config, item.gender) &&
          this.filterByCount(config, counter)
        ) {
          // Comment/uncomment to keep/change id after generation
          // item.id = counter + 1;
          counter++;
          return item;
        } 
      });
      // We update the source observable
      this._personsSource.next(fitleredPersons);
    });
  }

  filterByGender(config: GenerationConfig, gender: string): boolean {
    return (
      (config.male && gender === "Male") ||
      (config.female && gender === "Female")
    );
  }

  filterByCount(config: GenerationConfig, counter: number): boolean {
    return counter < config.count;
  }
}
