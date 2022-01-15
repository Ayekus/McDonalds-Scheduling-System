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

  availability: any = {
    BK: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
    },
    BEV: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
    },
    FC: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
    },
  };

  dateTouched = false;

  schedule: any = {
    BK: {
      0: '',
      1: '',
      2: '',
      3: '',
      4: '',
    },
    BEV: {
      0: '',
      1: '',
      2: '',
      3: '',
      4: '',
    },
    FC: {
      0: '',
      1: '',
      2: '',
      3: '',
      4: '',
    },
  };

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
    this.dateTouched = true;
    this.selectedDayOfWeek = moment(this.selected.startDate).format('dddd');
    this.selectedDayOfWeek = this.selectedDayOfWeek.toLowerCase();
    this.selectedDate = moment(this.selected.startDate).format('YYYY-MM-DD');

    for (let i = 0; i < 5; i++) {
      var shiftType = 'BK';
      this.queryFirebase(shiftType, this.selectedDayOfWeek, i);
      shiftType = 'BEV';
      this.queryFirebase(shiftType, this.selectedDayOfWeek, i);
      shiftType = 'FC';
      this.queryFirebase(shiftType, this.selectedDayOfWeek, i);
    }

    console.log(this.availability);
  }

  queryFirebase(training: any, dayOfWeek: any, timeWindow: any) {
    const docRef = this.afFirestore.collection('usersCollection', (ref) =>
      ref.where('training', '==', training).where(`availability.${dayOfWeek}`, '==', timeWindow),
    );

    const data = docRef.get().subscribe((dat: any) => {
      //console.log(dat.docs);

      if (dat.docs.length > 0) {
        var arrayOfElements = [];
        for (let i = 0; i < dat.docs.length; i++) {
          arrayOfElements.push(dat.docs[i].data());
        }
        console.log(arrayOfElements);
        this.availability[training][timeWindow] = arrayOfElements;
      }

      console.log(this.availability);
    });
  }

  setSchedule() {
    console.log('set Schedule');
  }
}
