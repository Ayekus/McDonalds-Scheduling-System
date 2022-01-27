// This is the typescript for the forgot password page - just a form where you put in email and firebase sends the reset password email

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, private router: Router) {}

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  success = false;

  ngOnInit(): void {}

  async forgotPassword() {
    if (this.form['email'].valid) {
      console.log(this.form['email']);
      console.log(this.form['email'].value);

      const email = this.form['email'].value;

      await this.afAuth.sendPasswordResetEmail(email).then((res: any) => {
        console.log(res);
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 5000);
      });
    }
  }
  //convenience getter for easy access to form fields
  get form(): { [key: string]: AbstractControl } {
    return this.forgotPasswordForm.controls;
  }
}
