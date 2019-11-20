import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { Button, Dropdown, Navbar, Nav } from 'react-bootstrap';

class UploadReceipt extends Component {

    constructor(props) {
        super(props);
        this.state = {
          key: '',
          name: '',
          page: '',
          page2: '',
          amount: '',
          size: '',
          format: '',
          color: '',
          value: '',
          address: '',
          tel:'',
          statusOrder: '',
          datePay: '',
          timePay: '',
          costPay: '',
          rand: Math.floor(Math.random() * 100000 + 1),
          checkPageAll: false,
          checkPageNum: false,
          image: null,
          url: '',
          url2:'',
          progress: 0,
        }
            this.handleChange1 = this
            .handleChange1
            .bind(this);
             this.handleUpload = this.handleUpload.bind(this);
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
              page2: board.page2,
              size: board.size,
              amount: board.amount,
              color: board.color,
              format: board.format,
              tel: board.tel,
              address: board.address,
              rand: board.rand,
              statusOrder: board.statusOrder,
              datePay: board.datePay,
              timePay: board.timePay,
              costPay: board.costPay,
              url: board.url,
              url2: board.url2,
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
    
        const { name, size, amount, format, color, page, page2, tel, address, statusOrder, rand, datePay, timePay, costPay, url, url2} = this.state;
    
        const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
        updateRef.set({
          name,
          page,
          page2,
          size,
          amount,
          color,
          format,
          tel,
          address,
          rand,
          statusOrder,
          datePay,
          timePay,
          costPay,
          url,
          url2
        }).then((docRef) => {
          this.setState({
            key: '',
            name: '',
            page: '',
            page2: '',
            size: '',
            amount: '',
            color: '',
            format: '',
            address: '',
            tel:'',
            rand: '',
            statusOrder: '',
            datePay: '',
            timePay: '',
            costPay: '',
            url: '',
            url2: '',
          });
          this.props.history.push("/show/"+this.props.match.params.id)
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }
      handleInit() {
        console.log('FilePond instance has initialised', this.pond);
    }

    
    handleChange1 = e => {
        if (e.target.files[0]) {
        const image = e.target.files[0];
        this.setState(() => ({image}));
        }
    }
      handleUpload = () => {
        const {image} = this.state;
        const storageRef = firebase.storage().ref(`images/${this.state.rand}pic`);
        const uploadTask = storageRef.put(image);
        uploadTask.on('state_changed', 
        (snapshot) => {
          // progrss function ....
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setState({progress});
        }, 
        (error) => {
             // error function ....
          console.log(error);
        }, 
      () => {
          // complete function ....
          uploadTask.snapshot.ref.getDownloadURL().then(
            url2 => this.setState({ url2: url2 })
          );
          // storage.ref('images').child(image.name).getDownloadURL().then(url => {
          //     console.log(url);
          //     this.setState({url});
          // })
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
                  <Nav.Link href="/historyonly">ประวัติการสั่งทำ</Nav.Link>
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
              ส่งใบเสร็จโอนเงิน
            </h3>
          </div>
          <div class="panel-body">
            <form onSubmit={this.onSubmit}>
  <label for="name">เลขที่คำสั่งซื้อ:{this.state.rand}</label>
            <div class="form-group">
                <label for="name">วันที่โอน:</label>
                <input type="text" class="form-control" name="datePay" value={this.state.datePay} onChange={this.onChange} placeholder="rand" />
              </div>
              <div class="form-group">
                <label for="name">เวลาโอน:</label>
                <input type="text" class="form-control" name="timePay" value={this.state.timePay} onChange={this.onChange} placeholder="rand" />
              </div>
              <div class="form-group">
                <label for="page">จำนวนเงิน:</label>
                <input type="text" class="form-control" name="costPay" value={this.state.costPay} onChange={this.onChange} placeholder="page" required />
              </div>
              <div> 
              <label id="font" for="file">อัพโหลดไฟล์ใบเสร็จ:</label>
                  <input type="file" onChange={this.handleChange1} required/>
                  <progress value={this.state.progress} max="100"/>
              </div>
              <button id="btnSubmit" type="submit" class="btn btn-success" onChange={this.onChange}></button>
              </form>
              <button onClick={this.handleUpload}>Upload</button>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadReceipt;