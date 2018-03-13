import React, { Component } from 'react';
import './MessageList.css';
import './User.js'

class MessageList extends Component {
constructor (props) {
    super(props);

    this.state = {
      messages: [],
      currentMessages: [],
      user: "",
      content: "",
      sentAt: "",
      newMessage: "",
   };
this.messagesRef = this.props.firebase.database().ref('messages');
}
componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat( message ) })
    });
}
handleChange(event) {
    this.setState({newMessage: event.target.value });
}
componentWillReceiveProps(nextProps) {
    const currentRoom = nextProps.currentRoom;
    this.setState({ currentMessages: this.state.messages.filter( message => message.roomId === currentRoom)});
}
createMessage(newMessage, currentRoom) {
    this.messagesRef.push({
    content: newMessage,
    roomId: this.props.currentRoom,
    user: this.props.user ? this.props.user.displayName : 'Guest',
    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
  },
    () => this.setState({ newMessage: "", currentMessages: this.state.messages.filter( message => message.roomId === currentRoom) }));
}
render() {
  return (
  <div>
    <div className="message-list">
      <div>
        <h2>Room {this.props.currentRoom}</h2>
        <form id="create-message" onSubmit={ (e) => { e.preventDefault(); this.createMessage(this.state.newMessage, this.props.currentRoom) } }>
              <input type="text" value={ this.state.newMessage } onChange={ (e) => { this.handleChange(e) } }  name="newMessage" />
              <input type="submit" value="Send"/>
            </form>
      </div>
      {this.state.currentMessages.map( (message) =>
          <div className="new-message" key={message.key}>
            <p className="user">{message.user}:</p>
            <p className="content">{message.content}</p>
            <p className="time-sent">{message.sentAt}</p>
          </div>
         )
       }
    </div>

  </div>
  );
 }
}

export default MessageList;
