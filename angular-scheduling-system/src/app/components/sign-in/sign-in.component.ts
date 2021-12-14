import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, private router: Router) {}

  signInForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  async signIn() {
    if (this.form['email'].valid && this.form['password'].valid) {
      console.log(this.form['email']);
      console.log(this.form['email'].value);

      const email = this.form['email'].value;
      const password = this.form['password'].value;

      await this.afAuth.signInWithEmailAndPassword(email, password).then((res: any) => {
        console.log(res);
        this.router.navigate(['/dashboard']);
      });
    }
  }

  //convenience getter for easy access to form fields
  get form(): { [key: string]: AbstractControl } {
    return this.signInForm.controls;
  }
}
