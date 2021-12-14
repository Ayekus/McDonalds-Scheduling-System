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
    trainingBEV: new FormControl(''),
    trainingFC: new FormControl(''),
    trainingBK: new FormControl(''),
  });

  ngOnInit(): void {}

  async setupUser() {
    if (
      this.form['firstName'].valid &&
      this.form['lastName'].valid &&
      this.form['employeeID'].valid &&
      this.form['trainingBEV'].valid &&
      this.form['trainingFC'].valid &&
      this.form['trainingBK'].valid
    ) {
      console.log(this.form['firstName']);
      console.log(this.form['firstName'].value);

      console.log(this.form['lastName']);
      console.log(this.form['lastName'].value);

      console.log(this.form['employeeID']);
      console.log(this.form['employeeID'].value);

      console.log(this.form['trainingBEV']);
      console.log(this.form['trainingBEV'].value);

      console.log(this.form['trainingFC']);
      console.log(this.form['trainingFC'].value);

      console.log(this.form['trainingBK']);
      console.log(this.form['trainingBK'].value);

      const firstName = this.form['firstName'].value;
      const lastName = this.form['lastName'].value;
      const employeeID = this.form['employeeID'].value;
      const trainingBEV = this.form['trainingBEV'].value;
      const trainingFC = this.form['trainingFC'].value;
      const trainingBK = this.form['trainingBK'].value;

      if (localStorage.getItem('user')) {
        let userInfo: any = localStorage.getItem('user');

        const user: any = JSON.parse(userInfo);

        console.log('uid: ', user.uid);

        this.afFirestore.collection('usersCollection').add({
          uid: user.uid,
          firstName: firstName,
          lastName: lastName,
          employeeID: employeeID,
          trainingBEV: trainingBEV,
          trainingFC: trainingFC,
          trainingBK: trainingBK,
        });
      }
    }
  }

  //convenience getter for easy access to form fields
  get form(): { [key: string]: AbstractControl } {
    return this.setupProfileForm.controls;
  }
}
