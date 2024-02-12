import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CometChatUIKit} from "@cometchat/chat-uikit-angular";
import {environment} from "../../../environments/environment";
import {CometChat} from "@cometchat-pro/chat";

@Component({
  selector: 'app-call-login',
  templateUrl: './call-login.component.html',
  styleUrls: ['./call-login.component.scss'],
})
export class CallLoginComponent  implements OnInit {
  public uid:string="";
  public error:string=""
  public usersArray:any[] = [
    {
      name:"Iron Man",
      uid:"superhero1",
      avatar:"https://data-us.cometchat.io/assets/images/avatars/ironman.png"
    },
    {
      name:"Captain America",
      uid:"superhero2",
      avatar:"https://data-us.cometchat.io/assets/images/avatars/captainamerica.png"
    },
    {
      name:"Spiderman",
      uid:"superhero3",
      avatar:"https://data-us.cometchat.io/assets/images/avatars/spiderman.png"
    },
    {
      name:"Wolvorine",
      uid:"superhero4",
      avatar:"https://data-us.cometchat.io/assets/images/avatars/wolverine.png"
    },
    {
      name:"Cyclops",
      uid:"superhero5",
      avatar:"https://data-us.cometchat.io/assets/images/avatars/cyclops.png"
    }
  ]
  public buttonImage:string="assets/button-opc.png";
  public backgroundImage:string="assets/Image-518@1x.png";
  public inProgress:boolean = false;
  constructor(private router:Router) {}

  ngOnInit() {
    this.checkUserLogIn();
  }

  checkUserLogIn() {
    CometChat.getLoggedinUser()?.then(
      (user) => {
        if (!user) {
          return;
        }
        else {
          const uid = user.getUid();
          this.router.navigate(['/call-audio'], { queryParams: { uid } });

        }
      }, error => {
        console.log("Some Error Occured", { error });
      }
    );
  }

  cometChatLogin(user: string) {
    this.error = ""
    if(user && user != ' '){
      this.inProgress = true
      const UID = user
      CometChat.getLoggedinUser()?.then(
        (user) => {
          if (!user) {
            CometChat.login(UID as any, environment?.cometChat?.apiKey as any).then(
              user => {
                this.inProgress = false
                const uid = user.getUid();
                this.router.navigate(['/call-audio'], { queryParams: { uid } });
              }, error => {
                this.inProgress = false
                this.error = error.message
              }
            ).catch((error:any)=>{
                this.inProgress = false
                console.log(error)
              })
          }
          else {
            this.inProgress = false
            this.router.navigate(['/call-audio']);
          }
        }, error => {
          this.inProgress = false
          this.error = error.message
        }
      ).catch((err:any)=>{
        this.inProgress = false
        console.log(err)
      })
    }
    else{
      this.inProgress = false
      this.error = "UID is required to login"
    }
  }

}
