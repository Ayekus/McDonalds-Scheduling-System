import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    this.availability = {
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

    this.schedule = {
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

    this.dateTouched = true;
    this.selectedDayOfWeek = moment(this.selected.startDate).format('dddd');
    this.selectedDayOfWeek = this.selectedDayOfWeek.toLowerCase();
    this.selectedDate = moment(this.selected.startDate).format('YYYY-MM-DD');

    this.loadSchedule(this.selectedDate);

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

  loadSchedule(date: any) {
    this.afFirestore
      .collection('scheduleCollection')
      .doc(date)
      .ref.get()
      .then((doc) => {
        console.log(doc);
        console.log(doc.data());
        if (doc.data()) {
          this.schedule = doc.data();
        }
      });
  }

  setSchedule() {
    console.log('set Schedule');

    this.afFirestore
      .collection('scheduleCollection')
      .doc(this.selectedDate)
      .set({
        BK: {
          0: this.schedule.BK[0],
          1: this.schedule.BK[1],
          2: this.schedule.BK[2],
          3: this.schedule.BK[3],
          4: this.schedule.BK[4],
        },
        BEV: {
          0: this.schedule.BEV[0],
          1: this.schedule.BEV[1],
          2: this.schedule.BEV[2],
          3: this.schedule.BEV[3],
          4: this.schedule.BEV[4],
        },
        FC: {
          0: this.schedule.FC[0],
          1: this.schedule.FC[1],
          2: this.schedule.FC[2],
          3: this.schedule.FC[3],
          4: this.schedule.FC[4],
        },
      });
  }
}
