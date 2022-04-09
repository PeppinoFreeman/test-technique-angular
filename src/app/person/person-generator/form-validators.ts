import { AbstractControl, ValidationErrors } from "@angular/forms";

export function countValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (control.value <= 0 || control.value > 1000) {
    return { ["INCORRECTVALUE"]: true };
  }
  return null;
}

export function genderValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (
    !control.value.controls.male.value &&
    !control.value.controls.female.value
  ) {
    return { ["ATLEASTONEGENDER"]: true };
  }
  return null;
}
