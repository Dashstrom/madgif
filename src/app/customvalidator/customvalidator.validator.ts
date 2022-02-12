import { FormGroup, AbstractControl } from "@angular/forms";

export function confirmPasswordOnRegister(
    password: string,
    confirmPassword: string,
    isRegistering: string
) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[password];
        const matchingControl = formGroup.controls[confirmPassword];
        const isRegisteringControl = formGroup.controls[isRegistering];

        if (isRegisteringControl.enabled && control.value !== '' && matchingControl.value !== '') {
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
        
    }
}