import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from './user-service/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  // providers:[UserService]
})
export class UserComponent implements OnInit{
id!:number;

constructor(private route:ActivatedRoute, private userService:UserService) {

}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

  this.route.params.subscribe(
    // next:
    (params:Params) => {
      this.id = +params['id']
    }
  )

}


onActivate(){
  //using event emitter
  // this.userService.activateUser.emit(true);

  //using Subject
  this.userService.activateUser.next(true);
  this.userService.activateUser.subscribe(data => console.log(data))
}
}
