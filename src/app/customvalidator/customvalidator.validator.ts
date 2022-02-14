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

export function checkPasswordComplexity(
    password: string,
    isRegistering: string
    ) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[password];
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!-/:-@[-`{-}])[A-Za-z\d!-/:-@[-`{-}]{6,64}$/;
        const isRegisteringControl = formGroup.controls[isRegistering];
        console.log(control.value);
        console.log(regex.test(control.value));
        if (isRegisteringControl.enabled && !regex.test(control.value)) {
            control.setErrors({ tooWeak: true});
        } else {
            control.setErrors(null);
        }
    }
}