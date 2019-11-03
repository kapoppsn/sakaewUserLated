import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import bglogin from './image/bglogin.png';
//import './login.css';
import Login from './Login';

class LoginPage extends Component {
    render() {
        return(
            <div>
                {/* <h4><Link to="/login" class="btn btn-primary">Login</Link></h4> */}
                <Login/>
            </div>
        );
    }
}

export default LoginPage;