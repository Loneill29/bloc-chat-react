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
}

createRoom(newRoomName) {
    this.roomsRef.push({
    name: newRoomName,
    });
    this.setState({ newRoomName: '' });
}

handleChange(event) {
    this.setState({newRoomName: event.target.value });
}

render () {
  return (
    <section className="sidebar">
      <h1>Bloc Chat</h1>
      <form id="add-room" onSubmit={ (e) => { e.preventDefault(); this.createRoom(this.state.newRoomName) } }>
        <input className="textInput" type="text" value={ this.state.newRoomName } onChange={ (e) => { this.handleChange(e) } } name="newRoomName"/>
        <input type="submit" value="New Room" />
      </form>
        <ul className="room-list">
          {
            this.state.rooms.map( (room, index) =>
            <li className="room" key={index}>
            <button onClick={ () => this.props.openRoom(room.key) } className="room-name">{ room.name }</button>
            </li>
              )
            }
          </ul>
    </section>
    );
  }
}

export default RoomList;
