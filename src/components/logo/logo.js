import Tilt from "react-tilt";
import './logo.css';

const Logo = _ => {
  return (
    <div className='ma3 mt0 inlineblock'>
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 80 }}
        style={{ height: 110, width: 100 }}
      >
        <div className="Tilt-inner pa3">
          <img style={{paddingTop: '3px'}} alt="smart brain" src="/images/smart_brain.jpg" width='80' height='70'/>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
