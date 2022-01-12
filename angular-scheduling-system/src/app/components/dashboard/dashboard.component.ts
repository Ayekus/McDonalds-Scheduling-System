import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, public afFirestore: AngularFirestore) {}

  selected: any;
  selectedDayOfWeek: any;
  selectedDate: any;
  locale: any = {
    applyLabel: 'Appliquer',
    customRangeLabel: ' - ',
    daysOfWeek: moment.weekdaysMin(),
    monthNames: moment.monthsShort(),
    firstDay: moment.localeData().firstDayOfWeek(),
  };

  userProfile: any;

  ngOnInit(): void {
    this.userProfile = localStorage.getItem('userProfile');
    this.userProfile = JSON.parse(this.userProfile);
    console.log(this.userProfile);
    if (this.userProfile) {
      this.userProfile.isManager ? '' : this.router.navigate(['/employee-dashboard']);
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  isInvalidDate(date: any) {
    return date.weekday() === 0;
  }

  refreshData() {
    this.selectedDayOfWeek = moment(this.selected.startDate).format('dddd');
    this.selectedDayOfWeek = this.selectedDayOfWeek.toLowerCase();
    this.selectedDate = moment(this.selected.startDate).format('YYYY-MM-DD');

    const docRef = this.afFirestore.collection('usersCollection', (ref) => ref.where('training', '==', 'BK'));

    const data = docRef.get().then((dat: any) => {
      console.log(dat);
    });

    console.log(data);
  }
}
