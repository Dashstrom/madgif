import { FormGroup } from "@angular/forms";

export function confirmPasswordOnRegister(
  password: string,
  confirmPassword: string,
  isRegistering: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[password];
    const matchingControl = formGroup.controls[confirmPassword];
    const isRegisteringControl = formGroup.controls[isRegistering];

    if (
      isRegisteringControl.enabled &&
      control.value !== ""
    ) {
      if (matchingControl.value === '') {
        console.log("Vide");
        matchingControl.setErrors({ required: true });
      } else if (control.value !== matchingControl.value) {
        console.log("Ne matchent pas");
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  };
}

export function checkPasswordComplexity(
  password: string,
  isRegistering: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[password];
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!-/:-@[-`{-}])[A-Za-z\d!-/:-@[-`{-}]{6,64}$/;
    const isRegisteringControl = formGroup.controls[isRegistering];
    if (isRegisteringControl.enabled && !regex.test(control.value)) {
      console.log("Trop faible");
      control.setErrors({ tooWeak: true });
    } else {
      control.setErrors(null);
    }
  };
}
