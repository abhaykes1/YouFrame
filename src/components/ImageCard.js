import React,{useEffect} from 'react';
import M from 'materialize-css';
import './css/ImageCard.css'
import {blue_shade} from '../assets/Colors'
function ImageCard(props) {
  useEffect(() => {
    M.AutoInit()
  }, []);
  var hrefUrl = `#${props.imageId}`
  return (
      <div>
        <div className="card cardContainer">
            <div  className="card-image">
                <img className="imageGrid preview-image" id={props.imageName} src={props.imageUrl} alt="..." />
            </div>
          <div className="card-action">
            <a className="modal-trigger " href={hrefUrl}><p className="truncate" style={{color: blue_shade.Light}} >{props.imageName}</p></a>
          </div>
        </div>
        <div id={props.imageId} class="modal">
          <div className="modal-content">
            <img alt='...' width="100%" height="100%" src={props.imageUrl} />
          </div>
        </div>

      </div>
  );
  
}





export default ImageCard;
