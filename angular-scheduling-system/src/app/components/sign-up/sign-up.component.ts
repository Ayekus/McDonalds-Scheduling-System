import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, private router: Router) {}

  signupForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  async signupUser() {
    if (this.form['email'].valid && this.form['password'].valid) {
      console.log(this.form['email']);
      console.log(this.form['email'].value);

      const email = this.form['email'].value;
      const password = this.form['password'].value;

      await this.afAuth.createUserWithEmailAndPassword(email, password).then((res: any) => {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/setup-profile']);
      });
    }
  }

  //convenience getter for easy access to form fields
  get form(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }
}
