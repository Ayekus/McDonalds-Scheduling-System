import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}

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
}
