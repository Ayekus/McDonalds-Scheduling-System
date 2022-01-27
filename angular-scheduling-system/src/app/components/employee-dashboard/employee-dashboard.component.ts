// This is the typescript for the employee dashboard - getting employee shifts from firebase based on weather they are scheduled on selected date, main routing system (after sign-in - in init), sending emails from click of button (in html file)

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  constructor(private router: Router, public afFirestore: AngularFirestore) {}

  selected: any;
  selectedDate: any;
  locale: any = {
    applyLabel: 'Appliquer',
    customRangeLabel: ' - ',
    daysOfWeek: moment.weekdaysMin(),
    monthNames: moment.monthsShort(),
    firstDay: moment.localeData().firstDayOfWeek(),
  };

  dateIsValid = true;
  userProfile: any;
  dateTouched = false;
  isWorking: any;

  scheduledTime: any;

  ngOnInit(): void {
    this.userProfile = localStorage.getItem('userProfile');
    this.userProfile = JSON.parse(this.userProfile);
    if (this.userProfile) {
      this.userProfile.isManager ? this.router.navigate(['/dashboard']) : '';
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  isInvalidDate(date: any) {
    return date.weekday() === 0;
  }

  refreshData() {
    if (this.selected.startDate) {
      console.log('exsists');
      console.log(this.selected.startDate);
      console.log(this.userProfile);
      const userUid = this.userProfile.uid;
      const training = this.userProfile.training;
      this.scheduledTime = undefined;
      this.dateTouched = true;
      this.selectedDate = moment(this.selected.startDate).format('YYYY-MM-DD');

      this.afFirestore
        .collection('scheduleCollection')
        .doc(this.selectedDate)
        .ref.get()
        .then((doc) => {
          console.log(doc);
          console.log(doc.data());
          if (doc.data()) {
            var data: any = doc.data();
            data = data[training];
            console.log(data);
            console.log(data[0]);
            for (let i = 0; i < 5; i++) {
              if (data[i] == userUid) {
                console.log(data[i]);
                console.log(i);
                switch (i) {
                  case 0:
                    this.scheduledTime = '5:00am - 9:00am';
                    break;
                  case 1:
                    this.scheduledTime = '9:00am - 1:00pm';
                    break;
                  case 2:
                    this.scheduledTime = '1:00pm - 5:00pm';
                    break;
                  case 3:
                    this.scheduledTime = '5:00pm - 9:00pm';
                    break;
                  case 4:
                    this.scheduledTime = '8:00pm - 11:00pm';
                    break;
                }
                this.isWorking = true;
              }
            }
            if (!this.scheduledTime) {
              console.log('here');
              this.isWorking = false;
            }
          } else {
            console.log('here2');
            this.isWorking = false;
          }
        });
    } else {
      console.log('!exsists');
      this.dateIsValid = false;
      setTimeout(() => {
        this.dateIsValid = true;
      }, 3500);
    }
  }
}
