import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsAudioRecorderService {
  audioBlobs: Blob[] = [];
  mediaRecorder: MediaRecorder | null = null;
  streamBeingCaptured: MediaStream | null = null;

  constructor() {}
  start(): Promise<void> {
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      return Promise.reject(new Error('mediaDevices API or getUserMedia method is not supported in this browser.'));
    } else {
      return navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream: MediaStream) => {
          this.streamBeingCaptured = stream;
          this.mediaRecorder = new MediaRecorder(stream);
          this.audioBlobs = [];

          this.mediaRecorder.addEventListener("dataavailable", (event: any) => {
            this.audioBlobs.push(event.data);
          });

          this.mediaRecorder.start();
        });
    }
  }

  stop(): Promise<Blob> {
    return new Promise((resolve) => {
      let mimeType = this.mediaRecorder?.mimeType;

      this.mediaRecorder && this.mediaRecorder?.addEventListener("stop", () => {
        let audioBlob = new Blob(this.audioBlobs, { type: mimeType });
        resolve(audioBlob);
      });

      this.cancel();
    });
  }

  cancel(): void {
    this.mediaRecorder?.stop();
    this.stopStream();
    this.resetRecordingProperties();
  }

  stopStream(): void {
    this.streamBeingCaptured?.getTracks().forEach(track => track.stop());
  }

  resetRecordingProperties(): void {
    this.mediaRecorder = null;
    this.streamBeingCaptured = null;
  }
}
