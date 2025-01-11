import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //using event emitter
  // activateUser = new EventEmitter<boolean>();

  // using subject
  activateUser = new Subject<boolean>();

  constructor() { }
}
