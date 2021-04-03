import { Component, OnDestroy, OnInit } from '@angular/core';
import firebase from "firebase/app";
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  authSubcription: Subscription;
  isAuth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubcription = this.authService.isAuthSubject.subscribe(
      (isConnected: boolean) => {
        this.isAuth = isConnected;
      }
    );
    this.authService.userConnect();
  }

  onSignOut() {
    this.authService.signOutUser();
  }

  ngOnDestroy() {
    this.authSubcription.unsubscribe();
  }

}
