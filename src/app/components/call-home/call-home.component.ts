import { Component, OnInit } from '@angular/core';
import {CometChat} from "@cometchat-pro/chat";
import {Router} from "@angular/router";

@Component({
  selector: 'app-call-home',
  templateUrl: './call-home.component.html',
  styleUrls: ['./call-home.component.scss'],
})
export class CallHomeComponent implements OnInit {
  loggedInUser: any;
  isLoggedIn: boolean;

  constructor(private router:Router) {
    this.loggedInUser = null;
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.checkUserLogin();
  }

  checkUserLogin () {
    CometChat.getLoggedinUser()?.then(
      (user) => {
        this.loggedInUser = user as any;
        this.isLoggedIn = this.loggedInUser != null && this.loggedInUser != undefined;
      }, error => {
        console.log("Some Error Occured", {error});
        return undefined;
      }
    )
  }

  login(){

    this.router.navigate(['/call-login']);
  }

  logout(){
    CometChat.logout().then(() =>  {
      this.loggedInUser = null;
      this.isLoggedIn = false;
    });
  }

  signup(){
    this.router.navigate(['/sign-up']);
  }
  goToCall(){
    const uid = this.loggedInUser.getUid();
    this.router.navigate(['/call-audio'], {queryParams: {uid}});
  }
}

