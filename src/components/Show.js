import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Navbar, Nav } from 'react-bootstrap';
import '../css/history.css';
import bgHistory from '../image/BGCreate2.png';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('boards').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/history")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="bgHistory">
      <div class="container">
        <header>
            <Navbar id="narbar" className="navAll">
              <Navbar.Brand href="#home" id="nbText1">สระแก้ว ก๊อปปี้แอนด์เซอร์วิส</Navbar.Brand>
                <Nav id="nbText2" className="mr-auto">
                  <Nav.Link href="/create">สร้างรายการสั่งทำ</Nav.Link>
                  <Nav.Link href="/history">ส่งหลักฐานการโอนเงิน</Nav.Link>
                  <Nav.Link href="/historyonly">ประวัติการสั่งทำ</Nav.Link>
                </Nav>
                <Nav.Link href="/" id="nbText3">logout</Nav.Link>
              {/* <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
              </Navbar.Collapse> */}
            </Navbar>
          </header>
        <div class="panel panel-default">
          <div class="panel-heading">
            <br></br>
          <h4><Link to="/history" a class="ex3" id="backtoHis">ประวัติการสั่งทำ</Link></h4>
          <br></br>
            <h3 class="panel-name" id="fontOrder">
              {this.state.board.rand}
            </h3>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div class="panel-body" id="fontDetailOrder">
            <dl>
              <dt>ขนาดกระดาษ:</dt>
              <dd>{this.state.board.size}</dd>
              <dt>หน้าที่:</dt>
              <dd>{this.state.board.page}</dd>
              <dt>จำนวนหน้า:</dt>
              <dd>{this.state.board.amount}</dd>
              <dt>จำนวนสำเนา:</dt>
              <dd>{this.state.board.copy}</dd>
              <dt>สี:</dt>
              <dd>{this.state.board.color}</dd>
              <dt>รูปแบบการเข้าเล่ม:</dt>
              <dd>{this.state.board.format}</dd>
              <dt>สถานะ</dt>
              <dd>{this.state.board.statusOrder}</dd>
            </dl>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Show;