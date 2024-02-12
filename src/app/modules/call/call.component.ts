import {Component, NgZone, OnInit} from '@angular/core';
import {CometChat} from "@cometchat-pro/chat";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss'],
})
export class CallComponent  implements OnInit {
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
  loggedinUser: any = undefined;
  isSomeoneCalling: boolean = false;
  isCallInProgress: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private zone: NgZone) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const uid = params['uid'];
      this.loggedinUser = uid;
    });

    let listnerID: string = this.loggedinUser.uid;
    CometChat.addCallListener(
      listnerID,
      new CometChat.CallListener({
        onIncomingCallReceived: (call: CometChat.Call) => {

          this.zone.run(() => {
            console.log("Incoming call:", call);
            this.isSomeoneCalling = true;
            this.incomingCall = call;
            this.error = "Incoming call"
            console.log(this.isSomeoneCalling, this.incomingCall,this.error );
          });
        },
        onOutgoingCallAccepted: (call: CometChat.Call) => {
          console.log("Outgoing call accepted:", call);
          const sessionID = call.getSessionId();

          const callSettingsCustom = new CometChat.CallSettingsBuilder()
            .setSessionID(sessionID)
            .enableDefaultLayout(true)
            .forceLegacyUI(true)

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
          CometChat.startCall(callSettingsCustom, htmlElement as any)
          this.zone.run(() => {
            this.isCallInProgress = true;
          });
        },
        onOutgoingCallRejected: (call: CometChat.Call) => {
          console.log("Outgoing call rejected:", call);
        },
        onIncomingCallCancelled: (call: CometChat.Call) => {
          console.log("Incoming call calcelled:", call);
          const sessionID = call.getSessionId();
          this.rejectCall(sessionID);
        },
        onCallEndedMessageReceived: (call: CometChat.Call) => {
          console.log("CallEnded Message:", call);
        }
      })
    );
  }


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

  startAudioCall(receiverUID: string) {
    const call = new CometChat.Call(receiverUID, CometChat.CALL_TYPE.AUDIO, CometChat.RECEIVER_TYPE.USER) as CometChat.Call;
    console.log('calling...', call);
    CometChat.initiateCall(call).then( (outgoingCall) => {
        console.log('Call initiated successfully:', outgoingCall);
        this.outgoingCall = call;
      },
        error => {
          console.log("Call initialization failed with exception:", error);
        }).catch(  (error) => {
      console.log('Call initiation failed with error:', error);
    });
  };

  startVideoCall(receiverUID: string) {
    const call = new CometChat.Call(receiverUID, CometChat.CALL_TYPE.VIDEO, CometChat.RECEIVER_TYPE.USER) as CometChat.Call;
    console.log('video calling...', call);

    CometChat.initiateCall(call).then( (outgoingCall) => {
        console.log('Video Call initiated successfully:', outgoingCall);
        this.outgoingCall = call;
      },
      error => {
        console.log("Call initialization failed with exception:", error);
      }).catch(  (error) => {
      console.log('Call initiation failed with error:', error);
    });
  };

  cancelCall(sessionID: string){
    let status = CometChat.CALL_STATUS.CANCELLED;

    CometChat.rejectCall(sessionID, status).then(
      (call: CometChat.Call) => {
        console.log("Call rejected successfully", call);
        this.outgoingCall = null;
      }).catch((error: CometChat.CometChatException) => {
      console.log("Call rejection failed with error:", error);
    })
  }

  // RECEIVE CALLS METHOOD
  acceptCall(sessionID: string){
    CometChat.acceptCall(sessionID).then(
      (call: CometChat.Call) => {
        console.log("Call accepted successfully:", call);
        const callSettingsCustom = new CometChat.CallSettingsBuilder()
          .enableDefaultLayout(true)
          .setSessionID(sessionID)
          .forceLegacyUI(true)
          .showRecordingButton(true)
          .build();

        const htmlElement = document.getElementById("my-call");
        CometChat.startCall(callSettingsCustom as any, htmlElement as any);

        this.zone.run(() => {
          this.isCallInProgress = true;
          this.isSomeoneCalling = true;
          this.incomingCall = call;
          this.error = "Accept call"
          this.outgoingCall = call;
        });
      }).catch((error: CometChat.CometChatException) => {
      console.log("Call acceptance failed with error", error);
    })
  };

  rejectCall(sessionID:string) {
    let status = CometChat.CALL_STATUS.REJECTED;

    CometChat.rejectCall(sessionID, status).then(
      (call: CometChat.Call) => {
        console.log("Call rejected successfully", call);

        this.zone.run(() => {
          console.log("Incoming call:", call);
          this.isSomeoneCalling = false;
          this.incomingCall = null;
          this.outgoingCall = null;
          console.log(this.isSomeoneCalling, this.incomingCall,this.error );
        });
      }).catch((error: CometChat.CometChatException) => {
      console.log("Call rejection failed with error:", error);
    })
  };
}
