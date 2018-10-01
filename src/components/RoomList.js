import React, { Component } from 'react';
import './RoomList.css'

class RoomList extends Component {

constructor(props) {
    super(props);

    this.state = {
    rooms: [],
    newRoomName: ''
};
this.roomsRef = this.props.firebase.database().ref('rooms');
}
componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat( room ) })
    });
    this.roomsRef.on('child_removed', snapshot  => {
    this.setState({ rooms: this.state.rooms.filter( room => room.key !== snapshot.key )  })
   });
}
createRoom(newRoomName) {
  if (!this.props.user || !newRoomName) { return }
   this.roomsRef.push({
     name: newRoomName,
     });
    this.setState({ newRoomName: '' });
}
deleteRoom(room) {
  this.roomsRef.child(room.key).remove();
}
handleChange(event) {
    this.setState({newRoomName: event.target.value });
}

render () {
  return (
    <section className="sidebar">
      <h1>Chat Rooms</h1>
      <form id="add-room" onSubmit={ (e) => { e.preventDefault(); this.createRoom(this.state.newRoomName) } }>
        <input className="textInput" type="text" value={ this.state.newRoomName } onChange={ (e) => { this.handleChange(e) } } name="newRoomName"/>
        <input type="submit" value="Add Room" />
      </form>
        <ul className="room-list">
          {
            this.state.rooms.map( (room, index) =>
            <li className="room" key={index}>
            <div className="room-btn">
              <button className="room-name-btn" onClick={ () => this.props.openRoom(room.key) } >{ room.name }</button>
              <button onClick={ () => this.deleteRoom(room) } className="delete-room">X</button>
              </div>
            </li>
              )
            }
          </ul>
    </section>
    );
  }
}

export default RoomList;
