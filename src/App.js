import React, { Component } from "react";
import Particles from "react-particles-js";
import "./App.css";
import SignIn from "./components/signin/signin";
import Register from "./components/register/register";
import Navigation from "./components/navigation/navigation";
import Rank from "./components/rank/rank";
import Logo from "./components/logo/logo";
import ImageLinkUrl from "./components/imageLinkForm/imageLinkForm";
import FaceRecognition from "./components/faceRecognition/faceRecognition";
import { getOrSendData, addOrRemDataFrmLs, doesImgHasValidExts, imageExtensions } from "./usefullFuncs/utils";
import { states } from "./usefullFuncs/states";

const particlesParams = {particles: { number: { value: 100, density: { enable: true, value_area: 800 } },},};

class App extends Component {
  constructor() {
    super();
    this.state = states;
	}

  calculateFaceLocation = data => {
    const cbb = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("fdb");
    const width = Number(image.width);
    const height = Number(image.height);
    const cfl = {
      leftCol: cbb.left_col * width,
      topRow: cbb.top_row * height,
      rightCol: width - cbb.right_col * width,
      bottomRow: height - cbb.bottom_row * height,
    };
    this.setState({ fDB: cfl });
  };

  handleInputChange = evt => this.setState({ input: evt.target.value });  

  handleImageBtnClick = async  _ => {
	  
    await this.setState({ imageUrl: this.state.input });
if(this.state.imageUrl.length < 3 
|| doesImgHasValidExts(this.state.imageUrl, imageExtensions) === undefined){
	return this.setState({nonSurportedImage: true});
}else{
	this.setState({nonSurportedImage: false, errorWorkingWithClarifaiApi: false})
;}

const imageDataOrError = await getOrSendData('https://smart-vision-ai.herokuapp.com/clarifaiapicallroute', 'POST', {imgUrl: this.state.imageUrl});
  
  if(imageDataOrError !== 'error working with Clarifai Api' ){
	 this.calculateFaceLocation(imageDataOrError);
 const entriesOrError = await getOrSendData('https://smart-vision-ai.herokuapp.com/image', 'PUT', {id: this.state.user.id});
 
 if(entriesOrError !== 'Unable to get entries' && typeof Number(entriesOrError) == 'number'){ 
 await this.setState(Object.assign(this.state.user, {entries: entriesOrError}));
 console.log(entriesOrError);
 
 const sessionStoreObj = await JSON.parse(sessionStorage.activeUserData);
  sessionStoreObj.userOrErorr.entries = Number(sessionStoreObj.userOrErorr.entries) + 1;
 addOrRemDataFrmLs('activeUserData', JSON.stringify(sessionStoreObj), 'add'); 
 } 
     }else {
  this.setState({errorWorkingWithClarifaiApi: true})
		 console.log(imageDataOrError);
		 }
  };
 
  onRouteChange = async (route, evt) => {
  if(evt !== undefined && evt.target.innerHTML === 'SignOut'){
 addOrRemDataFrmLs('isLoggedIn', null, 'remove');
 addOrRemDataFrmLs('activeUserData', null, 'remove');
	  await this.setState(states)
	  }else{
 await this.setState({ route: route, isSignedIn: route })
	  }
  }

  loadUserData = userInfo => this.setState({ 
    user: { id: userInfo.id, name: userInfo.name, 
		email: userInfo.email, entries: userInfo.entries, 
    joined: userInfo.joined,
      },
    });

  runRegStatus = bool => this.setState({isRegistered: bool});
  
    componentDidMount(){
 if(window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD){
	  if(sessionStorage.getItem('isLoggedIn') === 'true'){
		  const userData = JSON.parse(sessionStorage.activeUserData);
		  this.loadUserData(userData.userOrErorr);
	  }
  }
  }
	 
  render() {
    return (
      <div className="App">
        <Particles className="below" params={particlesParams} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        <Logo /> 
		  {this.state.nonSurportedImage ? 
<h3 style={{backgroundColor: 'black', color: 'white', padding: '5px'}}> Error: It look like you haven't pasted a link to check, or the
link you pasted is not supported, or is not an image link please Retry 
</h3> : null}
{this.state.errorWorkingWithClarifaiApi ? <h3 style={{backgroundColor: 'black', color: 'white', padding: '5px'}}> 
Error: Please check the link you pasted is a correct image link or there is probably a temporary issue on our
server. please Retry </h3> : null}
	   {this.state.route === "home" || sessionStorage.getItem('isLoggedIn') === 'true' ? (
          <div>
            <Rank userData={this.state.user} />
            <ImageLinkUrl onImageBtnClick={this.handleImageBtnClick} onInputChange={this.handleInputChange}/>
            <FaceRecognition fDB={this.state.fDB} imageUrl={this.state.imageUrl}/>
          </div>
        ) : this.state.route === "signIn" ? (
          <SignIn loadUserData={this.loadUserData} runRegStatus={this.runRegStatus} isRegistered={this.state.isRegistered} onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} runRegStatus={this.runRegStatus}/>
        )
		}
			
      </div>
    );
  }
}

export default App;
