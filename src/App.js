import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { Button, Dropdown, Navbar, Nav } from 'react-bootstrap';
import firebase from './Firebase';
import './css/orderid.css';
import bgOrder from './image/bgorder.png';
import NumberFormat from 'react-number-format';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { name, amount, size, format, color, page, rand,url2 } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        page,
        amount,
        size,
        color,
        format,
        rand,
        url2
      });
    });
    this.setState({
      boards
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    let notPay;

    notPay = this.state.boards.map(board =>{
      if(board.url2=="")
        return <tr>
        <td><Dropdown.Item href={`/upreceipt/${board.key}`}>{board.rand}</Dropdown.Item></td>
      </tr>
    }
      );

    return (
      <div class="bgOrder">
      <div class="container">
        <head>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
          />
        </head>
        <body>
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
              <h3 id="order" class="panel-name">
                เลือกเลขที่คำสั่งซื้อที่ต้องการชำระเงิน
            </h3>
            </div>
            <div class="panel-body">
              {/* <h4><Link to="/create">กลับ</Link></h4> */}
              <table class="table table-stripe">
                <thead>
                  <tr>

                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic" id="orderButton">
              เลขที่คำสั่งซื้อ
             </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* {this.state.boards.map(board =>
                    <tr>
                      <td><Dropdown.Item href={`/upreceipt/${board.key}`}>{board.notPay}</Dropdown.Item></td>
                    </tr>
                )} */}
                {notPay}
            </Dropdown.Menu>
          </Dropdown>
        </body>
      </div>
      </div>
    );
  }
}

export default App;
