// This is the typescript for the setup profile form - when signing up, this will send all information entered to firebase

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-setup-profile',
  templateUrl: './setup-profile.component.html',
  styleUrls: ['./setup-profile.component.css'],
})
export class SetupProfileComponent implements OnInit {
  constructor(private router: Router, public afFirestore: AngularFirestore) {}

  setupProfileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    employeeID: new FormControl('', Validators.required),
    training: new FormControl(''),
  });

  ngOnInit(): void {}

  async setupUser() {
    if (
      this.form['firstName'].valid &&
      this.form['lastName'].valid &&
      this.form['employeeID'].valid &&
      this.form['training'].valid
    ) {
      console.log(this.form['firstName']);
      console.log(this.form['firstName'].value);

      console.log(this.form['lastName']);
      console.log(this.form['lastName'].value);

      console.log(this.form['employeeID']);
      console.log(this.form['employeeID'].value);

      console.log(this.form['training']);
      console.log(this.form['training'].value);

      const firstName = this.form['firstName'].value;
      const lastName = this.form['lastName'].value;
      const employeeID = this.form['employeeID'].value;
      const training = this.form['training'].value;

      if (localStorage.getItem('user')) {
        let userInfo: any = localStorage.getItem('user');

        const user: any = JSON.parse(userInfo);

        console.log('uid: ', user.uid);
        console.log('user: ', user);

        this.afFirestore
          .collection('usersCollection')
          .doc(user.uid)
          .set({
            uid: user.uid,
            firstName: firstName,
            lastName: lastName,
            employeeID: employeeID,
            training: training,
            isManager: false,
            emailAddress: user.email,
            availability: { monday: '0', tuesday: '1', wednesday: '2' },
          })
          .then((res: any) => {
            this.afFirestore
              .collection('usersCollection')
              .doc(user.uid)
              .ref.get()
              .then((doc) => {
                console.log(doc.data());
                localStorage.setItem('userProfile', JSON.stringify(doc.data()));
                this.router.navigate(['/update-availability']);
              });
          });
      }
    }
  }

  //convenience getter for easy access to form fields
  get form(): { [key: string]: AbstractControl } {
    return this.setupProfileForm.controls;
  }
}
