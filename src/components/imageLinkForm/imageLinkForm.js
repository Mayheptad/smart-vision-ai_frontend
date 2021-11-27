
import './imageLinkForm.css';

function ImageLinkUrl({onInputChange, onImageBtnClick}) {
  return (
    <>
      <p className="f3">
        {" This magic brain will detect faces in your pictures, give it a try "}
      </p>
      <div className="center-stuff">
      <div className="center-stuff form pa3 br3 shadow-5">
        <input onChange={onInputChange} type="text" className="f4 pa2 w-70 center-stuff" />
        <button onClick={onImageBtnClick} className="grow w-30 f4 link ph3 dib white bg-light-purple">
          Detect
        </button>
      </div>
      </div>
   </>
  );
}

export default ImageLinkUrl;
