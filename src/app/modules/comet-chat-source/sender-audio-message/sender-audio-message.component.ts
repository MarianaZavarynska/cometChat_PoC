import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { checkMessageForExtensionsData } from "../utils/common";
import * as enums from "../utils/enums";
import { logger } from "../utils/common";
import { CometChat } from "@cometchat-pro/chat";
import MediaMessage = CometChat.MediaMessage;

@Component({
  selector: 'app-sender-audio-message',
  templateUrl: './sender-audio-message.component.html',
  styleUrls: ['./sender-audio-message.component.scss'],
})
export class SenderAudioMessageComponent  implements OnInit {
  @Input() messageDetails: any = null;
  @Input() showToolTip = true;
  @Input() showReplyCount = true;
  @Input() loggedInUser: any;

  checkReaction = [];
  audioUrl: string = '';
  message = Object.assign({}, this.messageDetails, {
    messageFrom: enums.SENDER,
  });
  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  GROUP: String = CometChat.RECEIVER_TYPE.GROUP;


  isRecording: boolean = false;


  constructor() {}

  ngOnInit() {
    try {
      this.getUrl();
      this.checkReaction = checkMessageForExtensionsData(
        this.messageDetails,
        enums.REACTIONS
      );
    } catch (error) {
      logger(error);
    }
  }

  startRecording() {

    const audioMessage: MediaMessage = new CometChat.MediaMessage(
      'fake_audio_url.mp3',
      CometChat.MESSAGE_TYPE.AUDIO,
      CometChat.RECEIVER_TYPE.USER,
      'receiverUserID'
    );
    this.isRecording = true;
    CometChat.sendMediaMessage(audioMessage).then(
      (res) => console.log("============", res)
    )

  }

  stopRecording() {
    // this.mediaObject.stopRecord();
    this.isRecording = false;
    // this.audioUrl = this.mediaObject.fullPath;
  }

  /**
   * Gets the url of audio to be displayed
   */
  getUrl() {
    try {
      this.audioUrl = this.messageDetails.data.url;
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Handles all the actions emitted by the child components that make the current component
   * @param Event action
   */
  actionHandler(action: any) {
    try {
      this.actionGenerated.emit(action);
    } catch (error) {
      logger(error);
    }
  }

}
