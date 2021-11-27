
import './faceRecognition.css';

const FaceRecognition = ({imageUrl, fDB}) => {
return (
    <div className='ma2 center-stuff'>
        <div className='absolute mt2'>
        <img id='fdb' width='500px' height='auto' alt='' src={imageUrl}/>
        <div style={{top:fDB.topRow, right:fDB.rightCol, bottom:fDB.bottomRow, left:fDB.leftCol}} className='bounding-box'></div>
        </div>
    </div>
)
}

export default FaceRecognition;