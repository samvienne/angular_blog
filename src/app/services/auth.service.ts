import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth: boolean;
  isAuthSubject = new Subject<boolean>();

  isAdmin: boolean;
  isAdminSubject = new Subject<boolean>();

  constructor() { }

  emitAuth() {
    this.isAuthSubject.next(this.isAuth);
  }

  emitAuthAdmin() {
    this.isAdminSubject.next(this.isAdmin);
  }

  createNewUser(email:string, password:string) {
    return new Promise<void>(
      (resolve,reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email:string, password:string) {
    return new Promise<void>(
      (resolve,reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }

  userConnect() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
          this.emitAuth();
        } else {
          this.isAuth = false;
          this.emitAuth();
        } 
      }
    );    
  }

  adminAuth() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user.uid === '7FPPymvZH2RMSDvt76mMnXXZ4e42') {
          this.isAdmin = true;
          this.emitAuthAdmin();
        } else {
          this.isAdmin = false;
          this.emitAuthAdmin();
        } 
      }
    );    

  }

  
}
