import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { UserService } from './user/user-service/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[UserService]
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Observables';
  isActivated = false;
  actiavteUserSubSubs!:Subscription;

  constructor(private userService:UserService){}

  ngOnInit(){
    this.actiavteUserSubSubs = this.userService.activateUser.subscribe(data => this.isActivated = data);
  }

  ngOnDestroy(): void {
    this.actiavteUserSubSubs.unsubscribe();
  }
}
