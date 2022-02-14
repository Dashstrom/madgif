import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {
  confirmPasswordOnRegister,
  checkPasswordComplexity
} from '../customvalidator/customvalidator.validator';
import { Router } from '@angular/router';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  formGroup!: FormGroup;
  register!: boolean;
  titleForm!: string;
  txtChangeFormBtn: any = "S'inscrire";
  submitted = false;
  authErrorMsg: string = '';
  authErrorPresence: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.register = false;
    this.titleForm = 'Se connecter';
    this.txtChangeFormBtn = 'Pas encore de compte ?';
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirmPassword: '',
      isRegistering: ''
    },
    {
      //Custom validators
      validator: [
        confirmPasswordOnRegister('password', 'confirmPassword', 'isRegistering'),
        checkPasswordComplexity('password', 'isRegistering')
      ]
    })
    this.formGroup.get('isRegistering').disable();
  }

  switchForm() {
    if (this.register) {
      this.titleForm = 'Se connecter';
      this.txtChangeFormBtn = 'Pas encore de compte ?';
      this.formGroup.get('isRegistering').disable();
    } else {
      this.titleForm = 'S\'inscrire';
      this.txtChangeFormBtn = 'Déjà inscrit ?';
      this.formGroup.get('isRegistering').enable();
    }
    this.authErrorPresence = false;
    this.register = !this.register;
  }

  get form() {
    return this.formGroup.controls;
  }

  onSubmit(formData: FormData) {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    if (this.register) {
      this.authService.register(formData['username'], formData['password']).subscribe(
        () => this.router.navigate(['']),
        err => {
          if (err.status == 409) {
            this.authErrorPresence = true;
            this.authErrorMsg = 'Ce nom d\'utilisateur existe déjà !';
          }
        }
      );
    } else {
      this.authService.login(formData['username'], formData['password']).subscribe(
        () => this.router.navigate(['']),
        err => {
          if (err.status == 401) {
            this.authErrorPresence = true;
            this.authErrorMsg = 'Nom d\'utilisateur ou mot de passe invalide !';
          }
        }
      );
    }
  }

}
