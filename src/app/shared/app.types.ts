import { FormControl, ValidationErrors } from "@angular/forms";

export type validatorFn = (control: FormControl) => ValidationErrors | null;
