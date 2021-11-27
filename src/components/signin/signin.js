
import React, { Component } from 'react';
import './signin.css';
import { getOrSendData, addOrRemDataFrmLs } from '../../usefullFuncs/utils';

class SignIn extends Component{
  constructor(props){
    super(props)
    this.state = { signInEmail : '', signInPassword : '', notAbleToSignin: 'maybe'}
  }

handleEmailChange = evt => this.setState({signInEmail: evt.target.value});
handlePasswordChange = evt => this.setState({signInPassword: evt.target.value});

 handleSignin = async evt => {
	 evt.preventDefault();
const {signInEmail, signInPassword} = this.state;
const body = {email: signInEmail, password: signInPassword};
const userOrErorr = await getOrSendData('https://smart-vision-ai.herokuapp.com/signin', 'POST', body)

 if(userOrErorr.id){
  await this.props.loadUserData(userOrErorr); await this.props.onRouteChange('home')
  addOrRemDataFrmLs('isLoggedIn', 'true', 'add'); 
  addOrRemDataFrmLs('activeUserData', JSON.stringify({userOrErorr}), 'add');
 } else {
	 await this.setState({notAbleToSignin: true});
  console.log(userOrErorr);
 }
 }

/*   setIsRegistered2falseNchangeRoute = _ => {
	//fix my stupid code here if fails
   this.props.runRegStatus(false); this.props.onRouteChange('Register')
   } */
   
   componentWillUnmount(){
	   this.props.runRegStatus(false)
	  // this.setIsRegistered2falseNchangeRoute();
   }

  render(){
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
      <form className="measure">
      <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f2 fw6 ph0 mh0"> Sign In </legend>
      <div className="mt3">
	  {this.state.notAbleToSignin && this.state.notAbleToSignin !== 'maybe'? 
<h3 className='success_registered'> Error: It look like u havent registered, or you are 
trying to login using the wrong credential, or there is perhaps a temporary issue on our server,
 please check your login details and retry 
</h3> : null}
      {this.props.isRegistered ? <h3 className='success_registered'> User is registered successfully, Please Log In Below </h3> : null }
      <label className="db fw6 lh-copy f6" htmlFor="email-address"> Email </label>
      <input
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        type="email" onChange={this.handleEmailChange}
        name="email-address"
        id="email-address"/>
      </div>
      <div className="mv3">
      <label className="db fw6 lh-copy f6" htmlFor="password"> Password </label>
      <input
        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        type="password" onChange={this.handlePasswordChange} name="password" id="password"/>
      </div>
      </fieldset>
      <div className="">
      <input onClick={this.handleSignin} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit"
        value="Sign in"/>
      </div>
      <div className="lh-copy mt3">
      <p onClick={ _ => this.props.onRouteChange('Register')} className="f6 link dim black db pointer"> Register </p>
      </div>
      </form>
      </main>
      </article>
          );
  }
    
}

export default SignIn;