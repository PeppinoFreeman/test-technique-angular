import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GenerationConfig } from "../generation-config";
import { countValidator } from "./form-validators";

@Component({
  selector: "app-person-generator",
  templateUrl: "./person-generator.component.html",
  styleUrls: ["./person-generator.component.scss"],
})
export class PersonGeneratorComponent implements OnInit {
  generatorForm: FormGroup;

  @Output() private _generateRequest = new EventEmitter<GenerationConfig>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.generatorForm = this.formBuilder.group({
      count: [1000, [Validators.required, countValidator]],
      male: [true],
      female: [true],
    });
  }

  isFormInvalid(): boolean {
    // Form is invalid if no gender is selected
    if (
      !this.generatorForm.controls.male.value &&
      !this.generatorForm.controls.female.value
    ) {
      return true;
    }
    return this.generatorForm.invalid;
  }

  generate(): void {
    const value: GenerationConfig = this.generatorForm.value;
	// IS CONDITION NECESSARY ?
    if (!this.isFormInvalid()) {
      this._generateRequest.emit(value);
    }
  }
}
