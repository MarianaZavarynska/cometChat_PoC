import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CometChat} from "@cometchat-pro/chat";
import {CometChatUIKit} from "@cometchat/chat-uikit-angular";
import {environment} from "../../../environments/environment";
import {CometChatCalls} from "@cometchat/calls-sdk-javascript";
import {CallSettings} from "@cometchat/calls-sdk-javascript/pack/models/CallSettings";


@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss'],
})
export class CallComponent  implements OnInit {
  //@ViewChild('exampleDiv', { static: true }) exampleDiv!: ElementRef;

  users: any = [
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
  status: string | null  = null;
  incomingCall: CometChat.Call | null = null;
  outgoingCall: CometChat.Call | null=null;
  error: string = '';
  loggedinUser: Object  | undefined = undefined;

  constructor() { }

  ngOnInit() {
    CometChat.login(this.users[0].uid as any, environment?.cometChat?.apiKey as any).then(
      user => {
        console.log("Login Successful:", { user });
      }, error => {
        console.log("Login failed with exception:", { error });
      }
    );

    let listnerID: string = this.users[0].uid;
    CometChat.addCallListener(
      listnerID,
      new CometChat.CallListener({
        onIncomingCallReceived: (call: CometChat.Call) => {
          console.log("Incoming call:", call);
          this.acceptCall(call.getSessionId())
        },
        onOutgoingCallAccepted: (call: CometChat.Call) => {
          console.log("Outgoing call accepted:", call);

          const callSettingsCustom = new CometChat.CallSettingsBuilder()
            .enableDefaultLayout(true)
            .setIsAudioOnlyCall(false)
            .forceLegacyUI(true)
            .showMuteAudioButton(true)
            .showEndCallButton(true)

            // .setCallListener(
            //   new CometChatCalls.OngoingCallListener({
            //     onUserListUpdated: (userList) => {
            //       console.log("user list:", userList);
            //     },
            //     onCallEnded: () => {
            //       console.log("Call ended");
            //     },
            //     onError: (error) => {
            //       console.log("Error :", error);
            //     },
            //     onMediaDeviceListUpdated: (deviceList) => {
            //       console.log("Device List:", deviceList);
            //     },
            //     onUserMuted: (event) => {
            //       // This event will work in JS SDK v3.0.2-beta1 & later.
            //       console.log("Listener => onUserMuted:", {
            //         userMuted: event.muted,
            //         userMutedBy: event.mutedBy,
            //       });
            //     },
            //     onScreenShareStarted: () => {
            //       // This event will work in JS SDK v3.0.3 & later.
            //       console.log("Screen sharing started.");
            //     },
            //     onScreenShareStopped: () => {
            //       // This event will work in JS SDK v3.0.3 & later.
            //       console.log("Screen sharing stopped.");
            //     },
            //     onCallSwitchedToVideo: (event) => {
            //       // This event will work in JS SDK v3.0.8 & later.
            //       console.log("call switched to video:", {
            //         sessionId: event.sessionId,
            //         callSwitchInitiatedBy: event.initiator,
            //         callSwitchAcceptedBy: event.responder,
            //       });
            //     },
            //     onUserJoined: (user) => console.log("event => onUserJoined", user),
            //     onUserLeft: (user) => console.log("event => onUserLeft", user),
            //   })
            // )
            .build();

          const htmlElement = document.getElementById("my-call");
          CometChat.startCall(callSettingsCustom as any, htmlElement as any)
        },
        onOutgoingCallRejected: (call: CometChat.Call) => {
          console.log("Outgoing call rejected:", call);
        },
        onIncomingCallCancelled: (call: CometChat.Call) => {
          console.log("Incoming call calcelled:", call);
        },
        onCallEndedMessageReceived: (call: CometChat.Call) => {
          console.log("CallEnded Message:", call);
        }
      })
    );

          // CometChatUIKit.login({uid: 'superhero2' as any, authToken: environment?.cometChat?.apiKey as any}).then(
          //   user => {
          //     console.log("Login Successful:", user);
          //        this.loggedinUser = user;
          //   }, error => {
          //     this.error = error.message
          //     console.log(error)
          //   }
          // )

    // CometChat.addCallListener(
    //   'call-listener-id',
    //   new CometChat.CallListener({
    //     onIncomingCallReceived: (call: CometChat.Call) => {
    //       console.log('Incoming call received:', call);
    //       // Handle incoming call event
    //
    //     },
    //     onOutgoingCallAccepted: (call: CometChat.Call) => {
    //       console.log('Outgoing call accepted:', call);
    //       this.acceptCall(call.getSessionId())
    //     },
    //     onOutgoingCallRejected: (call: CometChat.Call) => {
    //       console.log('Outgoing call rejected:', call);
    //       this.rejectCall(call.getSessionId())
    //       // Handle outgoing call rejected event
    //     },
    //     onCallEnded: (call: CometChat.Call) => {
    //       console.log('Call ended:', call);
    //       this.cancelCall(call.getSessionId())
    //       // Handle call ended event
    //     },
    //   })
    // );
  }

  // async fetchCometChatUsers() {
  //   try {
  //     // Replace the following with your actual logic to fetch users from CometChat
  //     // This is just a placeholder to demonstrate the concept
  //     await CometChat.getLoggedinUser().then((user) => {
  //       if (user && this.users) {
  //         this.users.push(user)
  //       }
  //     });
  //
  //   } catch (error) {
  //     console.error('Error fetching users from CometChat', error);
  //   }
  // }

  startCometChatCall() {
    let callListener: CometChat.OngoingCallListener = new CometChat.OngoingCallListener({
      onUserJoined: (user: CometChat.User) => {
        console.log("user joined:", user);
      },
      // Other call listener callbacks...
    });
    const callModalElement = document.getElementsByClassName('call-modal')[0] as HTMLElement;

    if(this.outgoingCall){
      let callSettings: CometChat.CallSettings = new CometChat.CallSettingsBuilder()
        .enableDefaultLayout(true)
        .setSessionID(this.outgoingCall.getSessionId())
        .setIsAudioOnlyCall(true)
        .build();
      const ongoingCallListener = new CometChat.OngoingCallListener({
        onUserJoined: (user: CometChat.User) => {
          console.log("user joined:", user);
        },
        onUserLeft: (user: CometChat.User) => {
          console.log("user left:", user);
        },
        onUserListUpdated: (userList: CometChat.User[]) => {
          console.log("user list:", userList);
        },
        onCallEnded: (call: CometChat.Call) => {
          console.log("Call ended:", call);
        },
        onError: (error: CometChat.CometChatException) => {
          console.log("Error :", error);
        },
        // onAudioModesUpdated: (audioModes: CometChat.AudioMode[]) => {
        //   console.log("audio modes:", audioModes);
        // }
      });
      CometChat.startCall(callSettings,callModalElement , ongoingCallListener);
    }

  }

  startAudioCall() {
    //const receiverID = this.users[1].uid; // Replace with the actual user ID you want to call
    const call = new CometChat.Call(this.users[1].uid, CometChat.CALL_TYPE.AUDIO, CometChat.RECEIVER_TYPE.USER) as CometChat.Call;
    //call.setCallInitiator(this.users[0]);
    console.log('calling...', call);
    CometChat.initiateCall(call).then( (outgoingCall) => {
        console.log('Call initiated successfully:', outgoingCall);
        //this.outgoingCall = outgoingCall;
        //this.incomingCall = outgoingCall;
        // perform action on success. Like show your calling screen.
      },
        error => {
          console.log("Call initialization failed with exception:", error);
        }).catch(  (error) => {
      console.log('Call initiation failed with error:', error);
    });

    // CometChat.initiateCall(call).then(
    //   outGoingCall => {
    //     console.log("Call initiated successfully:", outGoingCall);
    //   }, error => {
    //     console.log("Call initialization failed with exception:", error);
    //   }
    // );
  };

  // endCall() {
  //   if (this.ongoingCall) {
  //     CometChat.endCall(this.ongoingCall.sessionId).then(
  //       (call) => {
  //         console.log('Call ended successfully:', call);
  //         this.ongoingCall = null; // Clear the ongoingCall variable
  //       },
  //       (error) => {
  //         console.log('End call failed with error:', error);
  //       }
  //     );
  //   }

  cancelCall(sessionID: string){
    let status = CometChat.CALL_STATUS.CANCELLED;

    CometChat.rejectCall(sessionID, status).then(
      (call: CometChat.Call) => {
        console.log("Call rejected successfully", call);
      }).catch((error: CometChat.CometChatException) => {
      console.log("Call rejection failed with error:", error);
    })
  }

  // RECEIVE CALLS METHOOD
  acceptCall(sessionID: string){
    CometChat.acceptCall(sessionID).then(
      (call: CometChat.Call) => {
        console.log("Call accepted successfully:", call);
      }).catch((error: CometChat.CometChatException) => {
      console.log("Call acceptance failed with error", error);
    })
  };

  rejectCall(sessionID:string) {
    let status = CometChat.CALL_STATUS.REJECTED;

    CometChat.rejectCall(sessionID, status).then(
      (call: CometChat.Call) => {
        console.log("Call rejected successfully", call);
      }).catch((error: CometChat.CometChatException) => {
      console.log("Call rejection failed with error:", error);
    })
  };
}
