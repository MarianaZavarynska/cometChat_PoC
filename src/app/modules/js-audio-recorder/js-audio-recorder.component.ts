import {Component, OnDestroy, OnInit} from '@angular/core';

import {JsAudioRecorderService} from "./services/js-audio-recorder.service";

@Component({
  selector: 'app-js-audio-recorder',
  templateUrl: './js-audio-recorder.component.html',
  styleUrls: ['./js-audio-recorder.component.scss'],
})
export class JsAudioRecorderComponent  implements OnInit, OnDestroy {
  microphoneButton: HTMLButtonElement;
  recordingControlButtonsContainer: HTMLDivElement;
  stopRecordingButton: HTMLButtonElement;
  cancelRecordingButton: HTMLButtonElement;
  elapsedTimeTag: HTMLDivElement;
  closeBrowserNotSupportedBoxButton: HTMLButtonElement;
  overlay: HTMLDivElement;
  audioElement: HTMLAudioElement | null;
  audioElementSource: HTMLSourceElement | null;
  textIndicatorOfAudiPlaying: HTMLDivElement;

  audioRecordStartTime: Date;
  maximumRecordingTimeInHours = 1;
  elapsedTimeTimer: any;

  constructor(public jsAudioRecorderService: JsAudioRecorderService) {
    this.microphoneButton = document.getElementsByClassName("start-recording-button")[0] as HTMLButtonElement;
    this.recordingControlButtonsContainer = document.getElementsByClassName("recording-control-buttons-container")[0] as HTMLDivElement;
    this.stopRecordingButton = document.getElementsByClassName("stop-recording-button")[0] as HTMLButtonElement;
    this.cancelRecordingButton = document.getElementsByClassName("cancel-recording-button")[0] as HTMLButtonElement;
    this.elapsedTimeTag = document.getElementsByClassName("elapsed-time")[0] as HTMLDivElement;
    this.closeBrowserNotSupportedBoxButton = document.getElementsByClassName("close-browser-not-supported-box")[0] as HTMLButtonElement;
    this.overlay = document.getElementsByClassName("overlay")[0] as HTMLDivElement;
    this.audioElement = document.querySelector('.audio-element') as HTMLAudioElement;
    this.audioElementSource = this.audioElement?.getElementsByTagName("source")[0] as HTMLSourceElement;
    this.textIndicatorOfAudiPlaying = document.getElementsByClassName("text-indication-of-audio-playing")[0] as HTMLDivElement;
    this.audioRecordStartTime = new Date();
  }

  ngOnInit(): void {
    this.initializeElements();
    // this.playAudio();
    this.startAudioRecording();
    this.stopAudioRecording();
    this.cancelAudioRecording();
    this.addEventListeners();
  }

  ngOnDestroy(): void {
    clearInterval(this.elapsedTimeTimer);
  }

 initializeElements(): void {
    this.microphoneButton = document.getElementsByClassName("start-recording-button")[0] as HTMLButtonElement;
    this.recordingControlButtonsContainer = document.getElementsByClassName("recording-control-buttons-container")[0] as HTMLDivElement;
    this.stopRecordingButton = document.getElementsByClassName("stop-recording-button")[0] as HTMLButtonElement;
    this.cancelRecordingButton = document.getElementsByClassName("cancel-recording-button")[0] as HTMLButtonElement;
    this.elapsedTimeTag = document.getElementsByClassName("elapsed-time")[0] as HTMLDivElement;
    this.closeBrowserNotSupportedBoxButton = document.getElementsByClassName("close-browser-not-supported-box")[0] as HTMLButtonElement;
    this.overlay = document.getElementsByClassName("overlay")[0] as HTMLDivElement;
    this.audioElement = document.getElementsByClassName("audio-element")[0] as HTMLAudioElement;
    this.audioElementSource = this.audioElement.getElementsByTagName("source")[0] as HTMLSourceElement;
    this.textIndicatorOfAudiPlaying = document.getElementsByClassName("text-indication-of-audio-playing")[0] as HTMLDivElement;
   this.audioRecordStartTime = new Date();
  }

  addEventListeners(): void {
    this.microphoneButton.onclick = () => this.startAudioRecording();
    this.stopRecordingButton.onclick = () => this.stopAudioRecording();
    this.cancelRecordingButton.onclick = () => this.cancelAudioRecording();
    this.closeBrowserNotSupportedBoxButton.onclick = () => this.hideBrowserNotSupportedOverlay();
    this.audioElement && (this.audioElement.onended = () => this.hideTextIndicatorOfAudioPlaying());
  }

 handleDisplayingRecordingControlButtons(): void {
    this.microphoneButton.style.display = "none";
    this.recordingControlButtonsContainer.classList.remove("hide");
    this.handleElapsedRecordingTime();
  }

 handleHidingRecordingControlButtons(): void {
    this.microphoneButton.style.display = "block";
    this.recordingControlButtonsContainer.classList.add("hide");
    clearInterval(this.elapsedTimeTimer);
  }

 displayBrowserNotSupportedOverlay(): void {
    this.overlay.classList.remove("hide");
  }

hideBrowserNotSupportedOverlay(): void {
    this.overlay.classList.add("hide");
  }

createSourceForAudioElement(): void {
    let sourceElement = document.createElement("source");
    this.audioElement && (this.audioElement.appendChild(sourceElement));
    this.audioElementSource = sourceElement;
  }

   displayTextIndicatorOfAudioPlaying(): void {
    this.textIndicatorOfAudiPlaying.classList.remove("hide");
  }

  hideTextIndicatorOfAudioPlaying(): void {
    this.textIndicatorOfAudiPlaying.classList.add("hide");
  }

  handleElapsedRecordingTime(): void {
    this.displayElapsedTimeDuringAudioRecording("00:00");
    this.elapsedTimeTimer = setInterval(() => {
      let elapsedTime = this.computeElapsedTime(this.audioRecordStartTime);
      this.displayElapsedTimeDuringAudioRecording(elapsedTime);
    }, 1000);
  }

 displayElapsedTimeDuringAudioRecording(elapsedTime: string): void {
    this.elapsedTimeTag.innerHTML = elapsedTime;
    if (this.elapsedTimeReachedMaximumNumberOfHours(elapsedTime)) {
      this.stopAudioRecording();
    }
  }

 elapsedTimeReachedMaximumNumberOfHours(elapsedTime: string): boolean {
    let elapsedTimeSplitted = elapsedTime.split(":");
    let maximumRecordingTimeInHoursAsString = this.maximumRecordingTimeInHours < 10 ? "0" + this.maximumRecordingTimeInHours : this.maximumRecordingTimeInHours.toString();
    if (elapsedTimeSplitted.length === 3 && elapsedTimeSplitted[0] === maximumRecordingTimeInHoursAsString) {
      return true;
    } else {
      return false;
    }
  }

 computeElapsedTime(startTime: Date): string {
    let endTime = new Date();
    let timeDiff: number = endTime.getTime() - startTime.getTime();
    timeDiff = timeDiff / 1000;
    let seconds: string | number = Math.floor(timeDiff % 60);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timeDiff = Math.floor(timeDiff / 60);
    let minutes: string | number = timeDiff % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    timeDiff = Math.floor(timeDiff / 60);
    let hours = timeDiff % 24;
    timeDiff = Math.floor(timeDiff / 24);
    let days = timeDiff;
    let totalHours: string | number = hours + (days * 24);
    totalHours = totalHours < 10 ? "0" + totalHours : totalHours;
    if (totalHours === "00") {
      return minutes + ":" + seconds;
    } else {
      return totalHours + ":" + minutes + ":" + seconds;
    }
  }

  startAudioRecording(): void {
    console.log("Recording Audio...");
    let recorderAudioIsPlaying = this.audioElement && !this.audioElement.paused;
    console.log("paused?", !recorderAudioIsPlaying);
    if (recorderAudioIsPlaying) {
      this.audioElement && (this.audioElement.pause());
      this.hideTextIndicatorOfAudioPlaying();
    }

    this.jsAudioRecorderService.start()
      .then(() => {
        this.audioRecordStartTime = new Date();
        this.handleDisplayingRecordingControlButtons();
      })
      .catch(error => {
        this.handleRecordingError(error);
      });
  }

 stopAudioRecording(): void {
    console.log("Stopping Audio Recording...");
    this.jsAudioRecorderService.stop()
      .then(audioAsBlob => {
        this.playAudio(audioAsBlob);
        this.handleHidingRecordingControlButtons();
      })
      .catch(error => {
        this.handleRecordingError(error);
      });
  }

 cancelAudioRecording(): void {
    console.log("Canceling audio...");
    this.jsAudioRecorderService.cancel();
    this.handleHidingRecordingControlButtons();
  }

 playAudio(recorderAudioAsBlob: Blob): void {
    let reader = new FileReader();
    reader.onload = (e) => {
      let base64URL = e.target?.result;
      if (!this.audioElementSource)
        this.createSourceForAudioElement();
      if (typeof base64URL === "string") {
        this.audioElementSource && (this.audioElementSource.src = base64URL);
      }
      this.audioElementSource && (this.audioElementSource.type = recorderAudioAsBlob.type.includes(";") ? recorderAudioAsBlob.type.substr(0, recorderAudioAsBlob.type.indexOf(';')) : recorderAudioAsBlob.type);
      this.audioElement && (this.audioElement.load());

      this.audioElement && (this.audioElement.play().then(r => console.log("Playing audio...")));
      this.displayTextIndicatorOfAudioPlaying();
    };

    reader.readAsDataURL(recorderAudioAsBlob);
  }

  private handleRecordingError(error: any): void {
    if (error.message.includes("mediaDevices API or getUserMedia method is not supported in this browser.")) {
      console.log("To record audio, use browsers like Chrome and Firefox.");
      this.displayBrowserNotSupportedOverlay();
    }

    switch (error.name) {
      case 'AbortError':
        console.log("An AbortError has occurred.");
        break;
      case 'NotAllowedError':
        console.log("A NotAllowedError has occurred. User might have denied permission.");
        break;
      case 'NotFoundError':
        console.log("A NotFoundError has occurred.");
        break;
      case 'NotReadableError':
        console.log("A NotReadableError has occurred.");
        break;
      case 'SecurityError':
        console.log("A SecurityError has occurred.");
        break;
      case 'TypeError':
        console.log("A TypeError has occurred.");
        break;
      case 'InvalidStateError':
        console.log("An InvalidStateError has occurred.");
        break;
      case 'UnknownError':
        console.log("An UnknownError has occurred.");
        break;
      default:
        console.log("An error occurred with the error name " + error.name);
    }
  }
}

