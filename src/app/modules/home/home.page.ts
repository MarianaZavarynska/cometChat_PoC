import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { CometChatUIKit } from "@cometchat/chat-uikit-angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loggedInUser:CometChat.User|undefined;
  isLoggedIn = false;

  constructor(private router:Router) {
    this.loggedInUser = undefined;
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
  this.checkUserLogin();
  }

  checkUserLogin () {
    CometChatUIKit.getLoggedinUser()?.then(
      (user) => {
        this.loggedInUser = user;
        this.isLoggedIn = this.loggedInUser != null && this.loggedInUser != undefined;
      }, error => {
        console.log("Some Error Occured", {error});
        return undefined;
      }
    )
  }

  login(){
    this.router.navigate(['/login']);
  }

  logout(){
    CometChatUIKit.logout().then(() =>  {
      this.loggedInUser = undefined;
      this.isLoggedIn = false;
    });
  }

  signup(){
    this.router.navigate(['/sign-up']);
  }
  goToChats(){
    this.router.navigate(['/chats']);
  }
}
