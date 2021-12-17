import Tilt from "react-tilt";
import './logo.css';
// import Heading from "../heading/heading";
// import '../heading/heading.css'

const Logo = _ => {
  return (
    <div className='ma3 mt0 inlineblock'>
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 80 }}
        style={{ height: 90, width: 90 }}
      >
        <div className="Tilt-inner pa3"> 
        {/* { /images/smart_brain.jpg } */}
          <img alt="smart brain" src="https://mayheptad.github.io/smart-vision-ai_frontend/images/smart_brain.jpg" width='50' height='60'/>
        </div>
      </Tilt>
      {/* <Heading /> */}
    </div>
  );
};

export default Logo;
