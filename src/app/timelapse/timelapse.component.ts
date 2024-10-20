import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-timelapse',
  templateUrl: './timelapse.component.html',
  styleUrls: ['./timelapse.component.scss']
})
export class TimelapseComponent {
  public isRecording: boolean = false;
  private stream: MediaStream | undefined;
  private mediaRecorder: MediaRecorder | undefined;
  private recordedChunks: Blob[] = [];

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  ngOnInit(): void {
    // Check if window and navigator are defined (ensures it's running in the browser)
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      this.startCamera();
    } else {
      console.log("Camera cannot be accessed on the server-side.");
    }
  }

  startCamera() {
    if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
      console.log('Attempting to access the camera...');
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream: MediaStream) => {
          console.log('Camera access granted.');
          this.stream = stream;
          if (this.videoElement && this.videoElement.nativeElement) {
            this.videoElement.nativeElement.srcObject = stream;
            this.videoElement.nativeElement.play();
          }
        })
        .catch((err) => {
          console.error('Error accessing the camera:', err);
          alert('Camera access failed. Check browser permissions.');
        });
    } else {
      console.error('navigator.mediaDevices.getUserMedia is not supported in this browser.');
      alert('Your browser does not support camera access.');
    }
  }

  stopCamera() {
    if (this.stream) {
      const tracks = this.stream.getTracks();
      tracks.forEach(track => track.stop());  // Stop each track
    }
  }

  startRecording() {
    if (!this.stream) return;

    this.isRecording = true;
    this.recordedChunks = [];

    // Set up MediaRecorder to record the stream in webm format
    this.mediaRecorder = new MediaRecorder(this.stream, {
      mimeType: 'video/webm; codecs=vp9'  // Use vp9 codec for recording in webm
    });

    // Store the recorded video chunks
    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };

    this.mediaRecorder.start();
  }

  stopRecording() {
    if (!this.mediaRecorder) return;

    this.isRecording = false;
    this.mediaRecorder.stop();  // Stop recording

    this.mediaRecorder.onstop = () => {
      this.downloadTimelapse();
    };

    this.stopCamera();
  }

  downloadTimelapse() {
    if (this.recordedChunks.length === 0) return;

    const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'timelapse.webm';  // Download as webm, as MP4 isn't supported by MediaRecorder API directly
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  resetRecording() {
    this.recordedChunks = [];
    this.isRecording = false;
  }
}
