import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((res) => {
      console.log(this.router.url, 'Current URL');
      if (this.router.url == '/dashboard') {
        this.isLoggedIn = true;
        this.isManager = true;
      } else if (this.router.url == '/employee-dashboard') {
        this.isLoggedIn = true;
        this.isManager = false;
      } else {
        this.isLoggedIn = false;
        this.isManager = false;
      }
    });

    console.log(this.router.url);
  }
  title = 'angular-scheduling-system';

  userProfile: any;
  isManager: any;
  isLoggedIn: any;

  ngOnInit(): void {}

  signOut() {
    this.router.navigate(['/sign-out']);
  }

  signUp() {
    this.router.navigate(['/sign-up']);
  }

  signIn() {
    this.router.navigate(['/sign-in']);
  }

  dashboard() {
    this.router.navigate(['/dashboard']);
  }

  profile() {
    console.log('works');
  }

  employeeList() {
    console.log('works');
  }

  contactManager() {
    console.log('works');
  }
}
