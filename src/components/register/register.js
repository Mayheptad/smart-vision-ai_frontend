
import React, {Component} from 'react';
import {getOrSendData} from '../../usefullFuncs/utils';

class Register extends Component{

  constructor(props){
    super(props);
    this.state = {name: '', email: '', password: '', ableToRegister : 'maybe'}
  }

  handleNameChange = evt => this.setState({ name: evt.target.value})
  handleEmailChange = evt => this.setState({ email: evt.target.value})
  handlePasswordChange = evt => this.setState({ password: evt.target.value})
  setAbleToReg = val => this.setState({ableToRegister : val});

  handleRegister = async evt => {
	  evt.preventDefault();
  const {name, email, password} = this.state, body = {name, email, password}
  
 const userOrError = await getOrSendData('https://smart-vision-ai.herokuapp.com/register', 'POST', body);
 
 if(userOrError.id){
  await this.props.runRegStatus(true);  await this.props.onRouteChange('signIn');
    }else {
     this.setAbleToReg('failed');
      console.log(userOrError); 
  }
}
   componentWillUnmount(){
   this.setAbleToReg('maybe');
   }

  render(){
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
      <form className="measure">
      <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f2 fw6 ph0 mh0"> Register </legend>
      <div className="mt3">
      {this.state.ableToRegister === 'failed' ?
      <h3 className='success_registered'>User cannot be Registered, Either your Input are not correct,
	  or a temporary error on our server. Please check your inputs, and Try again</h3> :
       null}
      <label className="db fw6 lh-copy f6" htmlFor="name"> Name </label>
      <input
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        type="text" onChange={this.handleNameChange} name="name" id="name"/>
      </div>
      <div className="mt3">
      <label className="db fw6 lh-copy f6" htmlFor="email-address"> Email </label>
      <input
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        type="email" onChange={this.handleEmailChange} name="email-address" id="email-address"/>
      </div>
      <div className="mv3">
      <label className="db fw6 lh-copy f6" htmlFor="password"> Password </label>
      <input
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        type="password" onChange={this.handlePasswordChange} name="password" id="password"/>
      </div>
      </fieldset>
      <div className="">
      <input onClick={this.handleRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit"
        value="Register"/>
      </div>
      <div className="lh-copy mt3">
      <p onClick={ _ => this.props.onRouteChange('signIn')} className="f6 link dim black db pointer"> Sign In </p>
      </div>
      </form>
      </main>
      </article>
          )
  }
    
}

export default Register;