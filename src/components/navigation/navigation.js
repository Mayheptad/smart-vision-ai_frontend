

function Navigation({ isSignedIn, onRouteChange }) {
	
	const returnRouteChange = evt => onRouteChange('signIn', evt)

  if (isSignedIn === 'home'  || sessionStorage.getItem('isLoggedIn') === 'true') {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p onClick={returnRouteChange} className="f4 link dim black underline pa2 pointer">SignOut</p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p onClick={ _ => onRouteChange('signIn')} className="f4 link dim black underline pa2 pointer"> SignIn </p>
      </nav>
    );
  }
}

export default Navigation;
