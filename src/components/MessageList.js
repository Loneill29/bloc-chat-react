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
      newMessage: ""
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
componentWillReceiveProps(nextProps) {
    const currentRoom = nextProps.currentRoom;
    console.log(nextProps);
    this.setState({ currentMessages: this.state.messages.filter( message => message.roomId === currentRoom)});
}
createMessage(newMessage) {
    this.messagesRef.push({
    content: newMessage,
    });
    this.setState({ newMessage: '' }, {});
}
handleChange(event) {
    this.setState({newMessage: event.target.value, sentAt: this.props.firebase.database.ServerValue.TIMESTAMP });
}

render() {
  return (
    <div className="message-list">
      <div>
        <h2>{this.state.currentRoom}</h2>
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
  );
 }
}

export default MessageList;
