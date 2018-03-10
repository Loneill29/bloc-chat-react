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
createMessage(newMessage) {
    this.messagesRef.push({
    content: newMessage,
    roomId: this.props.currentRoom
    });
    this.setState({ newMessage: ""});
}
render() {
  return (
  <div>
    <div className="message-list">
      <div>
        <h2>{this.state.currentRoom}</h2>
        <form id="create-message" onSubmit={ (e) => { e.preventDefault(); this.createMessage(this.state.newMessage) } }>
              <input type="text" value={ this.state.newMessage } onChange={ (e) => { this.handleChange(e) } }  name="newMessage" />
              <input type="submit" value="Send"/>
            </form>
      </div>
      {this.state.currentMessages.map( (message) =>
          <div>
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
