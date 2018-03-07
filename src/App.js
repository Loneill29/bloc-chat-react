import React, { Component } from 'react';
import  RoomList  from './components/RoomList.js';
import MessageList from './components/MessageList.js';
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
    constructor(props) {
        super(props);
        this.state = {
          currentRoom: {},
        };
      }

    openRoom(room) {
      this.setState({currentRoom: room});
      }

    render() {
      return (
        <div className= "App">
         <RoomList firebase= {firebase} openRoom={(room) => {this.openRoom(room)} }/>
         <MessageList firebase= {firebase} currentRoom={this.state.currentRoom}  />
         </div>
   );
 }
}

export default App;
