import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import {storage} from '../Firebase';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { Button, Dropdown, Navbar,DropdownButton, FormControl, Nav } from 'react-bootstrap';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../css/create.css';
import bgCreate from '../image/bgwithprice.png';
import { File } from 'filepond';
import { thisExpression } from '@babel/types';
import { message } from 'antd';
import NumberFormat from 'react-number-format';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.toggleCheckPageNum = this.toggleCheckPageNum.bind(this);
    this.toggleCheckAll = this.toggleCheckAll.bind(this);
    this.state = {
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
      progress: 0,
      url2:'',
      a4B: 1,
      a4C: 6,
      a3B: 2,
      a3C: 40,
      thesis: 1.25,
      lacseen: 0.1,
      snake: 0.15,
      sonkliaw: 2.85,
      macDefault: 0,
      total: '',
      outputUser: ''
    }
    this.handleChange1 = this
      .handleChange1
      .bind(this);
      this.handleUpload1 = this.handleUpload1.bind(this);
      this.handleUpload2 = this.handleUpload2.bind(this);
  }

  handleInit() {
    console.log('FilePond instance has initialised', this.pond);
}

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleChange = event => {
    this.setState({ value: event.target.value});
  }

  handleUpload1 = () => {
    const {image} = this.state;
    const storageRef = firebase.storage().ref(`images/${this.state.rand}`);
    const uploadTask = storageRef.put(image);
    this.state.name = this.state.outputUser;
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
        url => this.setState({ url: url })
      );
      // storage.ref('images').child(image.name).getDownloadURL().then(url => {
      //     console.log(url);
      //     this.setState({url});
      // })
  });
  }
  handleUpload2 = () => {
    const {image} = this.state;
    const storageRef = firebase.storage().ref(`images/${this.state.rand}`);
    const uploadTask = storageRef.put(image);
    this.state.amount= this.state.page2-this.state.page+1;
    this.state.name = this.state.outputUser;
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
        url => this.setState({ url: url })
      );
      // storage.ref('images').child(image.name).getDownloadURL().then(url => {
      //     console.log(url);
      //     this.setState({url});
      // })
  });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { name, amount, size, format ,color, copy, page, page2, tel, address, url, url2, statusOrder, rand, datePay, timePay, costPay, downloadURL} = this.state;
    confirmAlert({
      title: 'Confirm to submit',
    message: <text>ชื่อ: {this.state.name}<br />
    เลขที่คำสั่งซื้อ: {this.state.rand}<br />
    หน้าที่: {this.state.page}-{this.state.page2}<br />
    ขนาดกระดาษ: {this.state.size}<br />
    จำนวนหน้า: {this.state.amount}<br />
    จำนวนสำเนา: {this.state.copy}<br />
    สี: {this.state.color}<br />
    รูปแบบการเข้าเล่ม: {this.state.format}<br />
    ที่อยู่: {this.state.address}<br />
    เบอร์ติดต่อ: {this.state.tel}<br /></text>,
      buttons: [
        {
          label: 'Yes',
          onClick: ()=> this.ref.add({
            name,
            page,
            page2,
            amount,
            copy,
            size,
            format,
            color,
            tel,
            address,
            statusOrder,
            rand,
            datePay,
            timePay,
            costPay,
            url,
            url2,
          }).then((docRef) => {
            this.setState({
              name: '',
              page: '',
              page2: '',
              amount: '',
              copy:'',
              size: '',
              format: '',
              color: '',
              address: '',
              tel:'',
              statusOrder: '',
              rand: '',
              datePay: '',
              timePay: '',
              costPay: '',
              downloadURL: '',
              url: '',
              url2: '',
            });
            this.props.history.push("/history")
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
        })
        },
        {
          label: 'No',
        }
      ]
    });
  };
  toggleCheckAll() {
    this.setState({
      checkPageAll: !this.state.checkPageAll
  });
  }
  toggleCheckPageNum() {
    this.setState({
      checkPageNum: !this.state.checkPageNum
  });
  }

handleChange1 = e => {
  if (e.target.files[0]) {
    const image = e.target.files[0];
    this.setState(() => ({image}));
  }
}
componentDidMount(){
  firebase.auth().onAuthStateChanged((user)=>{
      console.log(user.uid);
      console.log(user.displayName);
      var outputUser = user.displayName
      this.setState({ outputUser })
  });
}
DisplayName = (outputUser) =>{
  this.setState({outputUser})
}



  render() {
    const { name, size, format, color, page, copy, page2, tel, address, statusOrder, rand, datePay, timePay, costPay} = this.state;
    const checkPageAll = this.state.checkPageAll;
    const checkPageNum = this.state.checkPageNum;
    let checkPage, pageNotAll, up;
      if(checkPageAll==true && checkPageNum==false){
        const {amount} = page2-page;
       checkPage = <div><text>ทั้งหมด &nbsp;</text><input type="checkbox" name="page" value="All" onChange={this.onChange} onClick={this.toggleCheckAll}/>
<text>&nbsp;เลือกหน้า &nbsp;</text><input disabled type="checkbox" onClick={this.toggleCheckPageNum}/><input disabled id="focus" id="sizeCopy" type="number" class="form-control" min='1' name="amount" value={amount} onChange={this.onChange} placeholder="จำนวนหน้าทั้งหมด" required/>
</div>
      up=<button id="button" onClick={this.handleUpload1}>Upload</button>
      }
      else if(checkPageAll==false && checkPageNum==true){
        const {amount}=this.state;
        checkPage = <div><text>ทั้งหมด &nbsp;</text><input disabled type="checkbox" name="page" value="All" onChange={this.onChange} onClick={this.toggleCheckPageNum}/>
        <text>&nbsp;เลือกหน้า &nbsp;</text><input type="checkbox" onClick={this.toggleCheckPageNum}/><br /><text>จาก:</text><input type="number" min='1' class="form-control" name="page" value={page} onChange={this.onChange} placeholder="ex: 1" required/>
        <text>ถึง:</text><input type="number" min={page} class="form-control" name="page2" value={page2} onChange={this.onChange} placeholder="ex: 1" required/><input disabled id="focus" id="sizeCopy" type="number" class="form-control" min='1' name="amount" value={amount} onChange={this.onChange} placeholder="จำนวนหน้าทั้งหมด" required/>
</div>
      up=<button id="button" onClick={this.handleUpload2}>Upload</button>
      }
      else{
        const {amount} = this.state;
        checkPage = <div><text>ทั้งหมด &nbsp;</text><input type="checkbox" name="page" value="All" onChange={this.onChange} onClick={this.toggleCheckAll}/>
        <text>&nbsp;เลือกหน้า &nbsp;</text><input type="checkbox" onClick={this.toggleCheckPageNum}/><input id="focus" id="sizeCopy" type="number" class="form-control" min='1' name="amount" value={amount} onChange={this.onChange} placeholder="จำนวนหน้าทั้งหมด" required/>
</div>
        up=<button id="button" onClick={this.handleUpload1}>Upload</button>
      }
     
    return (
      <div class="bgCreate">
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
        <br></br>
        
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 id="orderHead" class="panel-name">
              รายการสั่งทำ
            </h3>
          </div>
          <div class="panel-body">
            {/* <h4><Link to="/history" class="btn btn-primary">ประวัติการสั่งทำ</Link></h4> */}

            <div class="form-group">
                <label for="name" id="font">ชื่อผู้รับเอกสาร: </label>
                <input id="focus" id="sizeName" type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder={this.state.outputUser} required/>
              </div>

            <form onSubmit={this.onSubmit}>
              <div id="font" class="form-group">
                <label for="page">หน้าที่ต้องการ:</label>
                {checkPage}
                {/* <input id="focus" id="sizeCopy" type="number" class="form-control" min='1' name="amount" value={amount} onChange={this.onChange} placeholder="จำนวนหน้าทั้งหมด" required/> */}
              </div>

              <div id="font" class="form-group">
                <label for="size">ขนาดกระดาษ: &nbsp;</label>
                <select name="size" id="box" value={size} variant="secondary" onChange={this.handleChange} onChange={this.onChange} placeholder="size" required>
                    <option value="">select</option >
                    <option value="A3">A3</option >
                    <option value="A4">A4</option >
                    {/* <option value="B4">B4</option >
                    <option value="F14">F14</option > */}
                </select >
              </div>

              <div class="form-group">
                <label for="copy" id="font">จำนวนสำเนา:</label>
                <input id="focus" id="sizeCopy" type="number" class="form-control" min='1' name="copy" value={copy} onChange={this.onChange} placeholder="ex: 1" required/>
              </div>

              <div id="font" class="form-group">
              <label for="color">สี: &nbsp;</label>
                  <select name="color" id="box" value={color} variant="secondary" onChange={this.handleChange} onChange={this.onChange} placeholder="color" required>
                    <option value="">select</option >
                    <option value="ขาว-ดำ">ขาว-ดำ</option >
                    <option value="สี">สี</option >
                </select >
            </div>

              <div id="font" class="form-group">
              <label for="format">รูปแบบการเข้าเล่ม: &nbsp;</label>
                  <select id="box" name="format" value={format} variant="secondary" onChange={this.handleChange} onChange={this.onChange} placeholder="format" required>
                    <option value="">select</option >
                    <option value="เย็บมุม">เย็บมุม</option >
                    <option value="สันกระดูกงู">สันกระดูกงู</option >
                    <option value="สันเกลียว">สันเกลียว</option >
                    <option value="ผลงาน">ผลงาน</option >
                    <option value="แลคซีน">แลคซีน</option >
                </select >
            </div>
              
            <div class="form-group">
                <label id="font" for="address">ที่อยู่:</label>
                <input id="focus" id="sizeAddr" type="text" class="form-control" name="address" value={address} onChange={this.onChange} placeholder="ex: 12/345" required/>
              </div>

              <div class="form-group">
                <label id="font" for="tel">เบอร์ติดต่อ:</label>
                <NumberFormat format="## ########" name="tel" value={tel} onChange={this.onChange} placeholder="ex: 0812345678" required/>
              </div>
              <div> 
              <label id="font" for="file">อัพโหลดไฟล์เอกสาร:</label>
                  <input type="file" onChange={this.handleChange1} accept=".pdf" required/>
                  <progress value={this.state.progress} max="100"/>
              </div>
              <button id="btnSubmit" type="submit" class="btn btn-success" onChange={this.onChange}></button>
              </form>
              {up}
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Create;