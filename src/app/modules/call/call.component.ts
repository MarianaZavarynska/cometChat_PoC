import {Component, NgZone, OnInit} from '@angular/core';
import {CometChat} from "@cometchat-pro/chat";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss'],
})
export class CallComponent  implements OnInit {
  protected readonly CometChat = CometChat;

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
  outgoingCall: CometChat.Call | null = null;
  error: string = '';
  loggedinUser: any = undefined;
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
          console.log("Incoming call:", call);
          this.zone.run(() => {
            this.incomingCall = call;
          });
        },
        onIncomingCallCancelled: (call: CometChat.Call) => {
          this.zone.run(() => {
            this.incomingCall = null
          });
        },
        onCallEndedMessageReceived: (call: CometChat.Call) => {
          console.log("CallEnded Message:", call);
          this.zone.run(() => {
            this.isCallInProgress = false;
            this.incomingCall = null;
          });
        },
      })
    );
  }



  startCall(callType: string, receiverUID: string) {

    const call = new CometChat.Call(receiverUID, callType, CometChat.RECEIVER_TYPE.USER) as CometChat.Call;

    CometChat.initiateCall(call).then( (outgoingAudioCall:any) => {

      this.outgoingCall = outgoingAudioCall;
      CometChat.addCallListener(this.loggedinUser.uid,
        new CometChat.CallListener({
          onOutgoingCallAccepted: (call: CometChat.Call) => {
            console.log("Outgoing call accepted:", call);
            const sessionID = call.getSessionId();

            this.zone.run(() => {
              this.isCallInProgress = true;
            });

            const callSettingsCustom = new CometChat.CallSettingsBuilder()
              .setSessionID(sessionID)
              .enableDefaultLayout(true)
              .forceLegacyUI(true)
              .build();

            const ongoingCallListener = new CometChat.OngoingCallListener({
              onCallEnded: (call: CometChat.Call) => {
                console.log("Call ended:", call);
                console.log('calling...', );

                this.zone.run(() => {
                    console.log("Call ended zone:", call);

                    //TODO: fix after end incoming call don't see another incoming call
                    const receiverUid = (call.getReceiver() as CometChat.User).getUid();
                    if(receiverUid === this.loggedinUser.uid){
                      this.incomingCall = null;
                    } else {
                      this.outgoingCall = null;
                    }
                  this.isCallInProgress = false;
                  });
              },
              // onMediaDeviceListUpdated: (deviceList) => {
              //   console.log("Device List:", deviceList);
              // },
              // onUserMuted: (event) => {
              //   // This event will work in JS SDK v3.0.2-beta1 & later.
              //   console.log("Listener => onUserMuted:", {
              //     userMuted: event.muted,
              //     userMutedBy: event.mutedBy,
              //   });
              // },
              // onScreenShareStarted: () => {
              //   // This event will work in JS SDK v3.0.3 & later.
              //   console.log("Screen sharing started.");
              // },
              // onScreenShareStopped: () => {
              //   // This event will work in JS SDK v3.0.3 & later.
              //   console.log("Screen sharing stopped.");
              // },
              // onCallSwitchedToVideo: (event) => {
              //   // This event will work in JS SDK v3.0.8 & later.
              //   console.log("call switched to video:", {
              //     sessionId: event.sessionId,
              //     callSwitchInitiatedBy: event.initiator,
              //     callSwitchAcceptedBy: event.responder,
              //   });
              // },
              onUserJoined: (user: any) => console.log("event => onUserJoined", user),
              // onUserLeft: (user) => console.log("event => onUserLeft", user),
            });

            const htmlElement = document.getElementById("my-call");
            CometChat.startCall(callSettingsCustom, htmlElement as any, ongoingCallListener)

          },
          onOutgoingCallRejected: (call: CometChat.Call) => {
                console.log("Outgoing call rejected:", call);
              this.zone.run(() => {
              this.outgoingCall = null;
              this.isCallInProgress = false;
            });
          },
        })
      )
      },
        error => {
          console.log("Call initialization failed with exception:", error);
          this.zone.run(() => {
            this.outgoingCall = null;
          });
        }).catch(  (error) => {
       console.log('Call initiation failed with error:', error);
    });
  };



  // startVideoCall(receiverUID: string) {
  //   // const call = new CometChat.Call(receiverUID, CometChat.CALL_TYPE.VIDEO, CometChat.RECEIVER_TYPE.USER) as CometChat.Call;
  //   // console.log('video calling...', call);
  //   //
  //   // CometChat.initiateCall(call).then( (outgoingCall) => {
  //   //     console.log('Video Call initiated successfully:', outgoingCall);
  //   //     this.outgoingCall = call;
  //   //   },
  //   //   error => {
  //   //     console.log("Call initialization failed with exception:", error);
  //   //   }).catch(  (error) => {
  //   //   console.log('Call initiation failed with error:', error);
  //   // });
  //   const call = new CometChat.Call(receiverUID, CometChat.CALL_TYPE.VIDEO, CometChat.RECEIVER_TYPE.USER) as CometChat.Call;
  //
  //   CometChat.initiateCall(call).then( (outgoingVideoCall:any) => {
  //
  //       this.outgoingCall = outgoingCall;
  //       CometChat.addCallListener(this.loggedinUser.uid,
  //         new CometChat.CallListener({
  //           onOutgoingCallAccepted: (call: CometChat.Call) => {
  //             console.log("Outgoing call accepted:", call);
  //             const sessionID = call.getSessionId();
  //
  //             this.zone.run(() => {
  //               this.isCallInProgress = true;
  //             });
  //
  //             const callSettingsCustom = new CometChat.CallSettingsBuilder()
  //               .setSessionID(sessionID)
  //               .enableDefaultLayout(true)
  //               .forceLegacyUI(true)
  //               .build();
  //
  //             const ongoingCallListener = new CometChat.OngoingCallListener({
  //               onCallEnded: (call: CometChat.Call) => {
  //                 console.log("Call ended:", call);
  //                 console.log('calling...', );
  //
  //                 this.zone.run(() => {
  //                   console.log("Call ended zone:", call);
  //
  //                   //TODO: fix after end incoming call don't see another incoming call
  //                   const receiverUid = (call.getReceiver() as CometChat.User).getUid();
  //                   if(receiverUid === this.loggedinUser.uid){
  //                     this.incomingCall = null;
  //                   } else {
  //                     this.outgoingCall = null;
  //                   }
  //                   this.isCallInProgress = false;
  //                 });
  //               },
  //               // onMediaDeviceListUpdated: (deviceList) => {
  //               //   console.log("Device List:", deviceList);
  //               // },
  //               // onUserMuted: (event) => {
  //               //   // This event will work in JS SDK v3.0.2-beta1 & later.
  //               //   console.log("Listener => onUserMuted:", {
  //               //     userMuted: event.muted,
  //               //     userMutedBy: event.mutedBy,
  //               //   });
  //               // },
  //               // onScreenShareStarted: () => {
  //               //   // This event will work in JS SDK v3.0.3 & later.
  //               //   console.log("Screen sharing started.");
  //               // },
  //               // onScreenShareStopped: () => {
  //               //   // This event will work in JS SDK v3.0.3 & later.
  //               //   console.log("Screen sharing stopped.");
  //               // },
  //               // onCallSwitchedToVideo: (event) => {
  //               //   // This event will work in JS SDK v3.0.8 & later.
  //               //   console.log("call switched to video:", {
  //               //     sessionId: event.sessionId,
  //               //     callSwitchInitiatedBy: event.initiator,
  //               //     callSwitchAcceptedBy: event.responder,
  //               //   });
  //               // },
  //               onUserJoined: (user: any) => console.log("event => onUserJoined", user),
  //               // onUserLeft: (user) => console.log("event => onUserLeft", user),
  //             });
  //
  //             const htmlElement = document.getElementById("my-call");
  //             CometChat.startCall(callSettingsCustom, htmlElement as any, ongoingCallListener)
  //
  //           },
  //           onOutgoingCallRejected: (call: CometChat.Call) => {
  //             console.log("Outgoing call rejected:", call);
  //             this.zone.run(() => {
  //               this.outgoingCall = null;
  //               this.isCallInProgress = false;
  //             });
  //           },
  //         })
  //       )
  //     },
  //     error => {
  //       console.log("Call initialization failed with exception:", error);
  //       this.zone.run(() => {
  //         this.outgoingCall = null;
  //       });
  //     }).catch(  (error) => {
  //     console.log('Call initiation failed with error:', error);
  //   });
  // };

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
          this.isCallInProgress = false;
          this.incomingCall = null;
        });
      }).catch((error: CometChat.CometChatException) => {
      console.log("Call rejection failed with error:", error);
    })
  };
}
