import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { Button, Dropdown, Navbar,DropdownButton, FormControl, Nav } from 'react-bootstrap';

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
      size: '',
      format: '',
      color: '',
      value: '',
      address: '',
      tel:'',
      statusOrder: false,
      rand: Math.floor(Math.random() * 100000 + 1),
      checkPageAll: false,
      checkPageNum: false,
      file: [{
        source: 'localhost:3000/create',
        options: {
            type: 'local'
        }
    }]
    };
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


  onSubmit = (e) => {
    e.preventDefault();
    const { name, amount, size, format ,color, page, page2, tel, address, statusOrder, rand} = this.state;

    confirmAlert({
      title: 'Confirm to submit',
    message: <text>ชื่อ: {this.state.name}<br />
    หน้าที่: {this.state.page}-{this.state.page2}<br />
    ขนาดกระดาษ: {this.state.size}<br />
    จำนวนหน้า: {this.state.amount}<br />
    สี: {this.state.color}<br />
    รูปแบบการเข้าเล่ม: {this.state.format}<br />
    ที่อยู่: {this.state.address}<br />
    เบอร์ติดต่อ: {this.state.tel}</text>,
      buttons: [
        {
          label: 'Yes',
          onClick: ()=> this.ref.add({
            name,
            page,
            page2,
            amount,
            size,
            format,
            color,
            tel,
            address,
            statusOrder,
            rand
          }).then((docRef) => {
            this.setState({
              name: '',
              page: '',
              page2: '',
              amount: '',
              size: '',
              format: '',
              color: '',
              address: '',
              tel:'',
              statusOrder: '',
              rand: ''
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

  render() {

    const { name, amount, size, format, color, page, page2, tel, address, statusOrder, rand} = this.state;
    const checkPageAll = this.state.checkPageAll;
    const checkPageNum = this.state.checkPageNum;
    let checkPage;
      if(checkPageAll==true && checkPageNum==false){
       checkPage = <div><text>All</text><input type="checkbox" name="page" value="All" onChange={this.onChange} onClick={this.toggleCheckAll}/>
<text>เลือกหน้า</text><input disabled type="checkbox" onClick={this.toggleCheckPageNum}/></div>
      }
      else if(checkPageAll==false && checkPageNum==true){
        checkPage = <div><text>All</text><input disabled type="checkbox" name="page" value="All" onChange={this.onChange} onClick={this.toggleCheckPageNum}/>
        <text>เลือกหน้า</text><input type="checkbox" onClick={this.toggleCheckPageNum}/><br /><text>From</text><input type="number" min='1' max='99' class="form-control" name="page" value={page} onChange={this.onChange} placeholder="1-99" required/>
        <text>To</text><input type="number" min={page} max='99' class="form-control" name="page2" value={page2} onChange={this.onChange} placeholder="1-99" required/></div>
      }
      else{
        checkPage = <div><text>All</text><input type="checkbox" name="page" value="All" onChange={this.onChange} onClick={this.toggleCheckAll}/>
        <text>เลือกหน้า</text><input type="checkbox" onClick={this.toggleCheckPageNum}/></div>
      }
     
    return (
      <div class="container">
        <header>
            <Navbar className="navAll">
              <Navbar.Brand href="#home">Sakaew Xerox shop</Navbar.Brand>
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
              รายการสั่งทำ
            </h3>
          </div>
          <div class="panel-body">
            {/* <h4><Link to="/history" class="btn btn-primary">ประวัติการสั่งทำ</Link></h4> */}

            <div class="form-group">
                <label for="name">ชื่อผู้รับเอกสาร:</label>
                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} required/>
              </div>

            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="page">หน้าที่:</label>
                {checkPage}
              </div>

              <div class="form-group">
                <label for="size">ขนาดกระดาษ:</label>
                <select name="size" value={size} variant="secondary" onChange={this.handleChange} onChange={this.onChange} placeholder="size" required>
                    <option value="">select</option >
                    <option value="ขาว-ดำ">A3</option >
                    <option value="สี">A4</option >
                    <option value="สี">B4</option >
                    <option value="สี">F14</option >
                </select >
              </div>

              <div class="form-group">
                <label for="amount">จำนวนหน้า:</label>
                <input type="number" class="form-control" min='1' name="amount" value={amount} onChange={this.onChange} placeholder="" required/>
              </div>

              <div class="form-group">
              <label for="color">สี: </label>
                  <select name="color" value={color} variant="secondary" onChange={this.handleChange} onChange={this.onChange} placeholder="color" required>
                    <option value="">select</option >
                    <option value="ขาว-ดำ">ขาว-ดำ</option >
                    <option value="สี">สี</option >
                </select >
            </div>

              <div class="form-group">
              <label for="format">รูปแบบการเข้าเล่ม: </label>
                  <select name="format" value={format} variant="secondary" onChange={this.handleChange} onChange={this.onChange} placeholder="format" required>
                    <option value="">select</option >
                    <option value="สันกระดูกงู">สันกระดูกงู</option >
                    <option value="สันเกลียว">สันเกลียว</option >
                    <option value="ผลงาน">ผลงาน</option >
                    <option value="แลคซีน">แลคซีน</option >
                </select >
            </div>
              
            <div class="form-group">
                <label for="address">ที่อยู่:</label>
                <input type="text" class="form-control" name="address" value={address} onChange={this.onChange} placeholder="address" required/>
              </div>

              <div class="form-group">
                <label for="tel">เบอร์ติดต่อ:</label>
                <input type="tel" class="form-control" name="tel" value={tel} onChange={this.onChange} placeholder="ex: 0812345678" required/>
              </div>
              <div> 
              <label for="file">อัพโหลดไฟล์เอกสาร:</label>
                <FilePond ref={ref => this.pond = ref}
                          files={this.state.files}
                          allowMultiple={true}
                          maxFiles={3} 
                          server="/api"
                          oninit={() => this.handleInit() }
                          onupdatefiles={fileItems => {
                              this.setState({
                                  files: fileItems.map(fileItem => fileItem.file)
                              });
                          }}>
                </FilePond></div>
              <button type="submit" class="btn btn-success" name="statusOrder" value={statusOrder} onChange={this.onChange}  >Submit</button>

              </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;