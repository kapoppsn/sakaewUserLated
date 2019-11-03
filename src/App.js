import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { Button, Dropdown, Navbar } from 'react-bootstrap';
import firebase from './Firebase';

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
      const { name, amount, size, format, color, page, rand } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        page,
        amount,
        size,
        color,
        format,
        rand
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
    return (
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
            <Navbar className="navHistory">
              <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
              </Navbar.Collapse>
            </Navbar>
          </header>
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-name">
                ประวัติการสั่งทำ
            </h3>
            </div>
            <div class="panel-body">
              <h4><Link to="/create">กลับ</Link></h4>
              <table class="table table-stripe">
                <thead>
                  <tr>

                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              เลขที่คำสั่งซื้อ
             </Dropdown.Toggle>
            <Dropdown.Menu>
              {this.state.boards.map(board =>
                    <tr>
                      <td><Dropdown.Item href={`/show/${board.key}`}>{board.rand}</Dropdown.Item></td>
                    </tr>
                )}

            </Dropdown.Menu>
          </Dropdown>
        </body>
      </div>

    );
  }
}

export default App;
