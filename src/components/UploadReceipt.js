import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { Button, Dropdown, Navbar, Nav } from 'react-bootstrap';
import '../css/receipt.css';
import bgReceipt from '../image/BGCreate.png';
import NumberFormat from 'react-number-format';

class UploadReceipt extends Component {

    constructor(props) {
        super(props);
        this.state = {
          key: '',
          name: '',
          page: '',
          page2: '',
          amount: '',
          copy: '',
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
          a4B: 1,
          a4C: 3,
          a3B: 2,
          a3C: 40,
          thesis: 1.25,
          lacseen: 0.1,
          snake: 0.15,
          sonkliaw: 2.85,
          macDefault: 0,
          total: 0,
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
              copy: board.copy,
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
    
        const { name, size, amount, copy, format, color, page, page2, tel, address, statusOrder, rand, datePay, timePay, costPay, url, url2} = this.state;
    
        const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
        updateRef.set({
          name,
          page,
          page2,
          size,
          amount,
          copy,
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
            copy: '',
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
    const {a4B, a4C, a3B, a3C, thesis, lacseen, snake, sonkliaw, macDefault, total} = this.state;
    let total1;
      if(this.state.size=="A4"){
        if(this.state.color=="ขาว-ดำ"){
          if(this.state.format=="เย็บมุม"){
            total1=a4B*this.state.amount*this.state.copy;
          }
          else if(this.state.format=="สันกระดูกงู"){
            total1=((a4B*this.state.amount)+(snake*this.state.amount))*this.state.copy;
          }
          else if(this.state.format=="ผลงาน"){
            total1=((a4B*this.state.amount)+(thesis*this.state.amount))*this.state.copy;
          }
          else if(this.state.format=="แลคซีน"){
            total1=((a4B*this.state.amount)+(lacseen*this.state.amount))*this.state.copy;
          }
          else if(this.state.format=="สันเกลียว"){
            total1=((a4B*this.state.amount)+(sonkliaw*this.state.amount))*this.state.copy;
          }
        }
        else if(this.state.color=="สี"){
          if(this.state.format=="เย็บมุม"){
            total1=a4C*this.state.amount*this.state.copy;
          }
          else if(this.state.format=="สันกระดูกงู"){
            total1=((a4C*this.state.amount)+(snake*this.state.amount))*this.state.copy;
          }
          else if(this.state.format=="ผลงาน"){
            total1=((a4C*this.state.amount)+(thesis*this.state.amount))*this.state.copy;
          }
          else if(this.state.format=="แลคซีน"){
            total1=((a4C*this.state.amount)+(lacseen*this.state.amount))*this.state.copy;
          }
          else if(this.state.format=="สันเกลียว"){
            total1=((a4C*this.state.amount)+(sonkliaw*this.state.amount))*this.state.copy;
          }
        }
      }
      else if(this.state.size=="A3"){
        if(this.state.color=="ขาว-ดำ"){
          if(this.state.format=="เย็บมุม"){
            total1=a3B*this.state.amount*this.state.copy;
          }
          else if(this.state.format=="สันกระดูกงู"){
            total1=((a3B*this.state.amount)+(snake*this.state.amount))*this.state.copy;
          }
          else if(this.state.format=="ผลงาน"){
            total1=((a3B*this.state.amount)+(thesis*this.state.amount))*this.state.copy;
          }
          else if(this.state.format=="แลคซีน"){
            total1=((a3B*this.state.amount)+(lacseen*this.state.amount))*this.state.copy;
          }
          else if(this.state.format=="สันเกลียว"){
            total1=((a3B*this.state.amount)+(sonkliaw*this.state.amount))*this.state.copy;
          }
        }
        else if(this.state.color=="สี"){
          if(this.state.format=="เย็บมุม"){
            total1=a3C*this.state.amount*this.state.copy;
          }
          else if(this.state.format=="สันกระดูกงู"){
            total1=((a3C*this.state.amount)+(snake*this.state.amount))*this.state.copy;
          }
          else if(this.state.format=="ผลงาน"){
            total1=((a3C*this.state.amount)+(thesis*this.state.amount))*this.state.copy;
          }
          else if(this.state.format=="แลคซีน"){
            total1=((a3C*this.state.amount)+(lacseen*this.state.amount))*this.state.copy;
          }
          else if(this.state.format=="สันเกลียว"){
            total1=((a3C*this.state.amount)+(sonkliaw*this.state.amount))*this.state.copy;
          }
        }
      }
      else{
        total1=0;
      }
    return (
      <div class="bgReceipt">
      <div class="container">
        <header>
            <Navbar id="narbar" className="navAll">
              <Navbar.Brand href="#home" id="nbText1">สระแก้ว ก๊อปปี้แอนด์เซอร์วิส</Navbar.Brand>
                <Nav id="nbText2" className="mr-auto">
                  <Nav.Link href="/create">สร้างรายการสั่งทำ</Nav.Link>
                  <Nav.Link href="/history">ส่งหลักฐานการโอนเงิน</Nav.Link>
                  <Nav.Link href="/historyonly">ประวัติการสั่งทำ</Nav.Link>
                  </Nav>
                  {/* <Nav.Link href="/profile" id="nbText3">Profile</Nav.Link> */}
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
            <br></br>
            <h3 id="receipt" class="panel-name">
              ส่งใบเสร็จโอนเงิน <label for="name">&nbsp;(ชื่อบัญชี: ภาสินี วสุพันธ์&nbsp;</label><label for="name">&nbsp;เลขที่บัญชี(กสิกร): 0488310453)&nbsp;</label>
            </h3>
          </div>
          <div class="panel-body">
            <form onSubmit={this.onSubmit}>
          <label id="nbText2" for="name">เลขที่คำสั่งซื้อ:{this.state.rand}</label>
          <div class="panel-body" id="pic">
            <dl>
            <dt><br /><h4>สระแก้ว ก๊อปปี้แอนด์เซอร์วิส</h4></dt>
            <dt>ชื่อผู้รับ:</dt>
              <dd>{this.state.name}</dd>
              <dt>ขนาดกระดาษ:</dt>
              <dd>{this.state.size}</dd>
              <dt>หน้าที่:</dt>
              <dd>{this.state.page}</dd>
              <dt>จำนวนหน้า:</dt>
              <dd>{this.state.amount}</dd>
              <dt>จำนวนสำเนา:</dt>
              <dd>{this.state.copy}</dd>
              <dt>สี:</dt>
              <dd>{this.state.color}</dd>
              <dt>รูปแบบการเข้าเล่ม:</dt>
              <dd>{this.state.format}</dd>
              <dt>ราคารวม:</dt>
  <dd><NumberFormat value={total1.toFixed(2)} displayType={'text'} thousandSeparator={true} /></dd>
            </dl>
          </div>
            <div id="nbText2" id="slip" class="form-group">
                <label for="name">วันที่โอน:</label>
                <input type="text" id="box" class="form-control" name="datePay" value={this.state.datePay} onChange={this.onChange} placeholder="ex. 23/08/2562" />
              </div>
              <div id="nbText2" id="slip" class="form-group">
                <label for="name">เวลาโอน:</label>
                <input type="text" id="box" class="form-control" name="timePay" value={this.state.timePay} onChange={this.onChange} placeholder="ex. 15:03" />
              </div>
              <div id="nbText2" id="slip" class="form-group">
                <label for="page">จำนวนเงิน:</label>
                <input type="text" id="box" class="form-control" name="costPay" value={this.state.costPay} onChange={this.onChange} placeholder="ex. 152.32" required />
              </div>
              <div> 
              <label id="nbText2" id="slipFile" for="file">อัพโหลดไฟล์ใบเสร็จ:</label>
                  <input id="putFile" type="file" accept=".jpg,.png" onChange={this.handleChange1} required/>
                  <progress id="tab" value={this.state.progress} max="100"/>
              </div>
              <button id="btnCon" type="submit" class="btn btn-success" onChange={this.onChange}></button>
              </form>
              <button id="confirmBtn" onClick={this.handleUpload}>Upload</button>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default UploadReceipt;