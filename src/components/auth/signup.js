import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import validator from 'validator';
import * as actions from '../../actions';

class Signout extends Component{
  handleFormSubmit( { email, password } ){
    this.props.signupUser({ email, password });
  }

  renderAlert(){
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render(){
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field component={renderField} type="text" name="email" label="Email"/>
				<Field component={renderField} type="password" name="password" label="Password"/>
        <Field component={renderField} type="password" name="passwordConfirm" label="Repeat password"/>
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>
    );
  }
}
const validate = values => {
	const errors = {}
	if (!values.email) {
		errors.email = 'Email is required';
	}else{
    if (!validator.isEmail(values.email)) {
      errors.email = 'Must be an valid email';
    }
  }
	if (!values.password) {
		errors.password = 'Password is required';
	}else{
    if(values.password.length < 6){
      errors.password = 'Password must be at least 6 chars long';
    }
    if(values.password != values.passwordConfirm){
      errors.passwordConfirm = 'Passwords must match';
    }
  }
	return errors;
}
const renderField = ({ input, label, type, meta: { touched, error ,invalid }}) => {
	const groupClass = touched ? (invalid ? 'form-group has-danger':'form-group has-success') : 'form-group';
	const inputClass = touched ? (invalid ? 'form-control form-control-danger':'form-control form-control-success') : 'form-control';

	return (
		<div className={groupClass}>
			<label>{label}</label>
			<input {...input} placeholder={label} type={type} className={inputClass} />
			<div className="form-control-feedback">
				{touched ? <span>{error}</span> : ''}
			</div>
		</div>
	);
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signout = reduxForm({
	form:'signin',
	validate
})(Signout);

Signout = connect(mapStateToProps, actions)(Signout);

export default Signout;
