import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';

import {AngularFireMessaging} from '@angular/fire/compat/messaging';
import {HttpClient} from '@angular/common/http';
import {Notification} from 'src/app/Models/notification.model';

@Injectable()
export class NotificationService {

    currentMessage = new BehaviorSubject<Notification>({});
    currentUserName!: string;
    constructor(private angularFireMessaging: AngularFireMessaging, private http: HttpClient) {
    }

    requestPermission() {

      this.angularFireMessaging.requestToken.subscribe({
        next: (token) => {
          this.http.post("http://localhost:3000/api/functions/token/"
                        + this.currentUserName + "/" + token, {}).subscribe();

        },
        error: (err) => {
          console.error('Unable to get permission to notify.', err);
        }
      });
    }

    receiveMessage() {
      this.angularFireMessaging.messages.subscribe({
        next: (payload) => {
          this.currentMessage.next(payload.notification as Notification);
        }
      });
    }
}

