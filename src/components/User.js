import React, { Component } from 'react';
import './User.css'

class User extends Component {
componentDidMount() {
   this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.createUser(user);
    });
}
signIn() {
    this.props.firebase.auth().signInWithPopup( new this.props.firebase.auth.GoogleAuthProvider() );
}
signOut() {
    this.props.firebase.auth().signOut();
}

render() {
    return (
      <div id="user">
        <div id="user-name">{ this.props.user ? this.props.user.displayName : '' }</div>
        <button className="sign-in-button" onClick={ this.props.user ? this.signOut.bind(this) : this.signIn.bind(this) }>
          <div>Sign { this.props.user ? 'out' : 'in' }</div>
        </button>
      </div>
    );
  }
}

export default User;
