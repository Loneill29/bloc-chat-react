import React, { Component } from 'react';
import  RoomList  from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';
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
        currentRoomId: 1,
        user: 0,
    };
}
createUser(user) {
    this.setState({user: user}, () => console.log(user));
}
openRoom(room) {
    this.setState({currentRoomId: room});
}

render() {
      return (
        <div className= "App">
         <User firebase={firebase} createUser={this.createUser.bind(this)} user={this.state.user} />
         <RoomList firebase= {firebase} currentRoom={this.state.currentRoomId} openRoom={(room) => {this.openRoom(room)} } user={this.state.user} />
         <MessageList firebase= {firebase} currentRoom={this.state.currentRoomId} user={this.state.user} />
         </div>
   );
  }
}

export default App;
