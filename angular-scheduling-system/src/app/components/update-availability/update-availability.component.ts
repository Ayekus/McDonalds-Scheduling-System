import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-availability',
  templateUrl: './update-availability.component.html',
  styleUrls: ['./update-availability.component.css'],
})
export class UpdateAvailabilityComponent implements OnInit {
  constructor(public afFirestore: AngularFirestore) {}

  shifts: any;
  mondayForm = new FormGroup({
    selectedTime: new FormControl(''),
  });
  tuesdayForm = new FormGroup({
    selectedTime: new FormControl(''),
  });
  wednesdayForm = new FormGroup({
    selectedTime: new FormControl(''),
  });
  thursdayForm = new FormGroup({
    selectedTime: new FormControl(''),
  });
  fridayForm = new FormGroup({
    selectedTime: new FormControl(''),
  });
  saturdayForm = new FormGroup({
    selectedTime: new FormControl(''),
  });
  sundayForm = new FormGroup({
    selectedTime: new FormControl(''),
  });

  ngOnInit(): void {
    this.afFirestore
      .collection('shiftCollection')
      .doc('jlNIQLCIg9cc5t2ImScg')
      .ref.get()
      .then((doc) => {
        console.log(doc.data());
        this.shifts = doc.data();
        this.shifts = this.shifts.shifts;
        console.log(this.shifts);
      });
  }

  setAvailability() {
    console.log('m', this.monday['selectedTime'].value);
    console.log('t', this.tuesday['selectedTime'].value);
    console.log('w', this.wednesday['selectedTime'].value);
    console.log('th', this.thursday['selectedTime'].value);
    console.log('f', this.friday['selectedTime'].value);
    console.log('s', this.saturday['selectedTime'].value);
    console.log('su', this.sunday['selectedTime'].value);
  }

  //convenience getter for easy access to form fields
  get monday(): { [key: string]: AbstractControl } {
    return this.mondayForm.controls;
  }

  get tuesday(): { [key: string]: AbstractControl } {
    return this.tuesdayForm.controls;
  }
  get wednesday(): { [key: string]: AbstractControl } {
    return this.wednesdayForm.controls;
  }
  get thursday(): { [key: string]: AbstractControl } {
    return this.thursdayForm.controls;
  }
  get friday(): { [key: string]: AbstractControl } {
    return this.fridayForm.controls;
  }
  get saturday(): { [key: string]: AbstractControl } {
    return this.saturdayForm.controls;
  }
  get sunday(): { [key: string]: AbstractControl } {
    return this.sundayForm.controls;
  }
}
