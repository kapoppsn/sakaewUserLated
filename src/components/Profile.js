import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Navbar, Nav } from 'react-bootstrap';
import { Avatar, Descriptions } from 'antd';
import 'antd/dist/antd.css';

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    render() {
        return (
            <div class="container">
                <header>
            <Navbar className="navAll">
              <Navbar.Brand href="#home">Sakaew Xerox sho</Navbar.Brand>
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
                <div>
                <Avatar size={100} icon="user" />
                </div>
                <div>
                <Descriptions title="User Info">
                    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="Remark">empty</Descriptions.Item>
                    <Descriptions.Item label="Address">
                    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>
                </Descriptions>
                </div>
            </div>
        );
    }
}

export default Profile;