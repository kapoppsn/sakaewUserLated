import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { Button, Dropdown, Navbar, Nav } from 'react-bootstrap';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      name: '',
      page: '',
      size: '',
      amount: '',
      color: '',
      format: '',
      address: '',
      tel:'',
      rand: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          name: board.name,
          page: board.page,
          size: board.size,
          amount: board.amount,
          color: board.color,
          format: board.format,
          tel: board.tel,
          address: board.address,
          rand: board.rand
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, size, amount, format, color, page, tel, address, rand } = this.state;

    const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
    updateRef.set({
      name,
      page,
      size,
      amount,
      color,
      format,
      tel,
      address,
      rand
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        page: '',
        size: '',
        amount: '',
        color: '',
        format: '',
        address: '',
        tel:'',
        rand: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <header>
            <Navbar className="navAll">
              <Navbar.Brand href="#home">Sakaew Xerox shot</Navbar.Brand>
                <Nav className="mr-auto">
                  <Nav.Link href="/create">สร้างรายการสั่งทำ</Nav.Link>
                  <Nav.Link href="/history">ประวัติการสั่งทำ</Nav.Link>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                  <Nav.Link href="/">logout</Nav.Link>
                </Nav>
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
            <h3 class="panel-name">
              แก้ไข้รายการ
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">ประวัติการสั่งทำ</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">เลขที่คำสั่งซื้อ:</label>
                <input type="text" class="form-control" name="rand" value={this.state.rand} onChange={this.onChange} placeholder="rand" />
              </div>
              <div class="form-group">
                <label for="page">หน้าที่:</label>
                <input type="text" class="form-control" name="page" value={this.state.amount} onChange={this.onChange} placeholder="page" required />
              </div>
              <div class="form-group">
                <label for="amount">จำนวนหน้า:</label>
                <input type="text" class="form-control" name="amount" value={this.state.amount} onChange={this.onChange} placeholder="amount" />
              </div>
              <div class="form-group">
                <label for="size">ขนาดกระดาษ:</label>
                <input type="text" class="form-control" name="size" value={this.state.size} onChange={this.onChange} placeholder="size" />
              </div>

              <div class="form-group">
                <label for="color">สี:</label>
                <input type="text" class="form-control" name="color" value={this.state.color} onChange={this.onChange} placeholder="color" />
              </div>

              <div class="form-group">
                <label for="format">รูปแบบการเข้าเล่ม:</label>
                <input type="text" class="form-control" name="format" value={this.state.format} onChange={this.onChange} placeholder="format" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;