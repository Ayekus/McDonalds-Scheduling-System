import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, private router: Router, public afFirestore: AngularFirestore) {}

  signInForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  userProfile: any;

  ngOnInit(): void {
    this.userProfile = localStorage.getItem('userProfile');
    this.userProfile = JSON.parse(this.userProfile);
    if (this.userProfile) {
      this.router.navigate(['/dashboard']);
    }
  }

  async signIn() {
    if (this.form['email'].valid && this.form['password'].valid) {
      console.log(this.form['email']);
      console.log(this.form['email'].value);

      const email = this.form['email'].value;
      const password = this.form['password'].value;

      await this.afAuth.signInWithEmailAndPassword(email, password).then((res: any) => {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.afFirestore
          .collection('usersCollection')
          .doc(res.user.uid)
          .ref.get()
          .then((doc) => {
            console.log(doc.data());
            localStorage.setItem('userProfile', JSON.stringify(doc.data()));
            this.router.navigate(['/dashboard']);
          });
      });
    }
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  //convenience getter for easy access to form fields
  get form(): { [key: string]: AbstractControl } {
    return this.signInForm.controls;
  }
}
