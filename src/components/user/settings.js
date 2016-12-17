import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Settings extends Component{
  componentWillMount(){
    this.props.fetchMessage();
  }
  render(){
    return (
      <div>User settigns for: {this.props.email}</div>
    );
  }
}

function mapStateToProps(state){
  return { email: state.auth.email }
}

export default connect(mapStateToProps, actions)(Settings);
