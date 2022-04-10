import { Component } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { GenerationConfig } from "../generation-config";
import { Person } from "../person";
import { PersonService } from "../person.service";

@Component({
  selector: "app-person-list",
  templateUrl: "./person-list.component.html",
  styleUrls: ["./person-list.component.scss"],
})
export class PersonListComponent {
  displayedColumns: string[] = [
    "id",
    "firstName",
    "lastName",
    "gender",
    "email",
  ];
  dataSource: Person[] = [];

  private _destroy$ = new Subject<boolean>();

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    // We get the data from the service observable with each change
    this.personService.personsData$.pipe(takeUntil(this._destroy$)).subscribe({
      next: (data) => (this.dataSource = data),
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  generate(config: GenerationConfig): void {
    this.personService.generatePersonsRequest(config);
  }
}
