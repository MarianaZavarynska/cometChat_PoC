import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { CometChatUIKit } from "@cometchat/chat-uikit-angular";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cometchat-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
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
  constructor(private router:Router) {
  }

  ngOnInit() {
      this.checkUserLogIn();
  }

  checkUserLogIn() {
      CometChatUIKit.getLoggedinUser()?.then(
          (user) => {
              if (!user) {
                  return;
              }
              else {
                  this.router.navigate(['/chats'])

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
        CometChatUIKit.getLoggedinUser()?.then(
            (user) => {
              if (!user) {
                CometChatUIKit.login({uid: UID as any, authToken: environment?.cometChat?.apiKey as any}).then(
                    user => {
                      this.inProgress = false
                      console.log("Login Successful:", { user });
                      this.router.navigate(['/chats']);
                    }, error => {
                      this.inProgress = false
                      this.error = error.message
                    }
                )
                    .catch((error:any)=>{
                      this.inProgress = false
                      console.log(error)
                    })
              }
              else {
                this.inProgress = false
                this.router.navigate(['/chats']);
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
