import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';

import {AngularFireMessaging} from '@angular/fire/compat/messaging';

@Injectable()
export class NotificationService {

    currentMessage = new BehaviorSubject<any>(null);

    constructor(private angularFireMessaging: AngularFireMessaging) {
    }

    requestPermission() {
      this.angularFireMessaging.requestToken.subscribe({
        next: (token) => {
          console.log(token);
        },
        error: (err) => {
          console.error('Unable to get permission to notify.', err);
        }
      });
    }

    receiveMessage() {
      this.angularFireMessaging.messages.subscribe({
        next: (payload) => {
          console.log("new message received. ", payload);
          this.currentMessage.next(payload);
        }
      });
    }
}

