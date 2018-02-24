import React, { Component } from 'react';
import  RoomList  from './components/RoomList.js';
import * as firebase from 'firebase';

  var config = {
    apiKey: "AIzaSyCysvxMJaw25C0hvFpO5rKowNEkhIyjCpw",
    authDomain: "bloc-chat-react-ee16d.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-ee16d.firebaseio.com",
    projectId: "bloc-chat-react-ee16d",
    storageBucket: "bloc-chat-react-ee16d.appspot.com",
    messagingSenderId: "166444808008"
  };

  firebase.initializeApp(config);

  class App extends Component {
    render() {
      return (
        <div className= "App">
         <RoomList firebase= {firebase} />
        </div>
      );
    }
  }

export default App;
