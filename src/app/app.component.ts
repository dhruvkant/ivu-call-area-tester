import { Component, OnDestroy, OnInit, VERSION } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { SignalHandler } from './signal-handler';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  name = 'Angular ' + VERSION.major;
  signalingChannel = webSocket(
    'wss://socketsbay.com/wss/v2/100/f9b5066412b5d042266ff9a20e60a0ae/'
  );
  signalHandler = new SignalHandler(this.signalingChannel);

  callableObjectSelected() {
    this.signalingChannel.next(
      JSON.stringify({
        selectableObjects: [{ userId: 'IVU12345678', userType: 'VEHICLE' }],
        pttState: 'FREE',
        callState: 'NEW',
      })
    );
  }

  connectingCall() {
    this.signalingChannel.next(
      JSON.stringify({
        selectableObjects: [{ userId: 'IVU12345678', userType: 'VEHICLE' }],
        pttState: 'CONNECTING',
        callState: 'CONNECTING',
      })
    );
  }

  connectedCall() {
    this.signalingChannel.next(
      JSON.stringify({
        selectableObjects: [{ userId: 'IVU12345678', userType: 'VEHICLE' }],
        pttState: 'FREE',
        callState: 'CONNECTED',
      })
    );
  }

  disconnectingCall() {
    this.signalingChannel.next(
      JSON.stringify({
        selectableObjects: [{ userId: 'IVU12345678', userType: 'VEHICLE' }],
        pttState: 'TERMINATED',
        callState: 'DISCONNECTING',
      })
    );
  }

  ngOnDestroy(): void {
    this.signalHandler?.stopHandling();
  }
}
