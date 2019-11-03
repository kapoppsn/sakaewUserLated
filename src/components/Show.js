import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('boards').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/history")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/history">ประวัติการสั่งทำ</Link></h4>
            <h3 class="panel-name">
              {this.state.board.rand}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>ขนาดกระดาษ:</dt>
              <dd>{this.state.board.size}</dd>
              <dt>หน้าที่:</dt>
              <dd>{this.state.board.page}</dd>
              <dt>จำนวนหน้า:</dt>
              <dd>{this.state.board.amount}</dd>
              <dt>สี:</dt>
              <dd>{this.state.board.color}</dd>
              <dt>รูปแบบการเข้าเล่ม:</dt>
              <dd>{this.state.board.format}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>

          </div>
        </div>
      </div>
    );
  }
}

export default Show;