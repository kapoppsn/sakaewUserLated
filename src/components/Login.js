import React, { Component } from 'react';
import firebase, { auth, provider } from '../Firebase';
import { Button, Dropdown, Navbar } from 'react-bootstrap';
import '../css/login.css';
import bg from '../image/BGLogin2.png';

const LoginButton = (props) => {
  //<Link to='/SellAndBuy'><button onClick={props.onClick}>Sign in</button></Link>
  return (
    <Button id='LoginButton' class="btn" onClick={props.onClick}></Button>
  )
}

class Login extends React.Component {
  signin() {
    var provider = new firebase.auth.GoogleAuthProvider();

    provider.setCustomParameters({
    })

    firebase.auth().signInWithPopup(provider).then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log('uid: ',user.uid)
      console.log(window.location);
      window.location.href = "/Create"; //ทำให้รอ log in เสร็จก่อนค่อยเปลี่ยนหน้า
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }
  render() {
    return (
      <div class="bg">
        <div class = "container">
          <LoginButton onClick={this.signin} />
        </div>
      </div >
    );
  }
}

export default Login;