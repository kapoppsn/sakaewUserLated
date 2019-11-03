import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Navbar,DropdownButton } from 'react-bootstrap';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      name: '',
      page: '',
      amount: '',
      size: '',
      format: '',
      color: '',
      value: '',
      address: '',
      tel:'',
      rand: Math.floor(Math.random() * 100000 + 1)
    };

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
    const { name, amount, size, format ,color, page, tel, address, rand} = this.state;

    this.ref.add({
      name,
      page,
      amount,
      size,
      format,
      color,
      tel,
      address,
      rand
    }).then((docRef) => {
      this.setState({
        name: '',
        page: '',
        amount: '',
        size: '',
        format: '',
        color: '',
        address: '',
        tel:'',
        rand: ''
      });
      this.props.history.push("/history")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { name, amount, size, format, color, page, tel, address, rand} = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-name">
              รายการสั่งทำ
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/history" class="btn btn-primary">ประวัติการสั่งทำ</Link></h4>
            <form onSubmit={this.onSubmit}>
                <label>เลขที่คำสั่งซื้อ:</label>
                <label>{this.state.rand}</label>

              <div class="form-group">
                <label for="page">หน้าที่:</label>
                <input type="text" class="form-control" name="page" value={page} onChange={this.onChange} placeholder="All or 1-99" />
              </div>

              <div class="form-group">
                <label for="size">ขนาดกระดาษ:</label>
                <input type="text" class="form-control" name="size" value={size} onChange={this.onChange} placeholder="size" />
              </div>

              <div class="form-group">
                <label for="amount">จำนวนหน้า:</label>
                <input type="text" class="form-control" name="amount" value={amount} onChange={this.onChange} placeholder="amount" />
              </div>

              <div class="form-group">
              <label for="color">สี: </label>
                  <select name="color" value={color} variant="secondary" onChange={this.handleChange} onChange={this.onChange} placeholder="color">
                    <option value="">select</option >
                    <option value="ขาว-ดำ">ขาว-ดำ</option >
                    <option value="สี">สี</option >
                </select >
            </div>

              <div class="form-group">
              <label for="format">รูปแบบการเข้าเล่ม: </label>
                  <select name="format" value={format} variant="secondary" onChange={this.handleChange} onChange={this.onChange} placeholder="format">
                    <option value="">select</option >
                    <option value="สันกระดูกงู">สันกระดูกงู</option >
                    <option value="สันเกลียว">สันเกลียว</option >
                    <option value="ผลงาน">ผลงาน</option >
                    <option value="แลคซีน">แลคซีน</option >
                </select >
            </div>
              
            <div class="form-group">
                <label for="address">ที่อยู่:</label>
                <input type="text" class="form-control" name="address" value={address} onChange={this.onChange} placeholder="address" />
              </div>

              <div class="form-group">
                <label for="tel">เบอร์ติดต่อ:</label>
                <input type="tel" class="form-control" name="tel" value={tel} onChange={this.onChange} placeholder="tel" />
              </div>

              <button type="submit" class="btn btn-success">Submit</button>
          

              <h4><Link to="/">กลับ</Link></h4>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;