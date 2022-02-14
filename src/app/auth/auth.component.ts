import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { confirmPasswordOnRegister } from "../customvalidator/customvalidator.validator";

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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.register = false;
    this.titleForm = "Se connecter";
    this.txtChangeFormBtn = "S'inscrire";
    this.formGroup = this.formBuilder.group(
      {
        username: ["", [Validators.required]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: "",
        register: "",
      },
      {
        //Custom validators
        validator: confirmPasswordOnRegister(
          "password",
          "confirmPassword",
          "register"
        ),
      }
    );
  }

  switchForm() {
    if (this.register) {
      this.titleForm = "Se connecter";
      this.txtChangeFormBtn = "S'inscrire";
    } else {
      this.titleForm = "S'inscrire";
      this.txtChangeFormBtn = "Se connecter";
    }
    this.register = !this.register;
  }

  get form() {
    return this.formGroup.controls;
  }

  onSubmit(formData: FormData) {
    this.submitted = true;

    if (this.formGroup.invalid) {
      console.log("invalide");
      return;
    }

    if (this.register) {
      console.log("REGISTER");
      this.authService
        .register(formData["username"], formData["password"])
        .subscribe(
          () => console.log("oui !!"),
          (err) => console.log(err)
        );
    } else {
      console.log("LOGIN");
      console.log(
        this.authService.login(formData["username"], formData["password"])
      );
    }
  }
}
