import { FormGroup, AbstractControl } from "@angular/forms";

export function confirmPasswordOnRegister(
    password: string,
    confirmPassword: string,
    register: string
) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[password];
        const matchingControl = formGroup.controls[confirmPassword];
        const isRegisteringControl = formGroup.controls[register];
        
        if (control.value !== matchingControl.value && isRegisteringControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}