import { Component } from '@angular/core';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {

    var firebaseConfig = {
      apiKey: "AIzaSyAuPgqLnu8Clb6rxsCIUHqCrs43RQBGCeM",
      authDomain: "blogposts-5d6f9.firebaseapp.com",
      projectId: "blogposts-5d6f9",
      databaseURL: "https://blogposts-5d6f9-default-rtdb.firebaseio.com/",
      storageBucket: "blogposts-5d6f9.appspot.com",
      messagingSenderId: "673183544003",
      appId: "1:673183544003:web:b6777046293e67f1366876"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
