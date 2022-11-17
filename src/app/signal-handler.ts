import { Subscription } from "rxjs";
import { WebSocketSubject } from "rxjs/webSocket";

export class SignalHandler {

  signalingChannel: WebSocketSubject<any>;
  private signalingChannelSubscription: Subscription;

  constructor(signallingChannel: WebSocketSubject<any>) {
    this.signalingChannel = signallingChannel;
    this.signalingChannel.subscribe((message: MessageEvent)=> {
      const data = JSON.parse(message.data);
      this.handle(data);
    })
  }

  handle(data: any,) {
    switch(data?.messageType){
    }
  }

  stopHandling() {
    this.signalingChannelSubscription?.unsubscribe();
  }

}