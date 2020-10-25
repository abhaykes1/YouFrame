/* eslint-disable default-case */
import React,{useState} from 'react';
import {storage, fire} from './fire'
import firebase from 'firebase'
import Loader from 'react-loader-spinner'
import { useAlert } from "react-alert";

function Upload() {
  const alert = useAlert();

  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const set_image_url = async (filename, url) => {
    if(!url){
      //console.log("can't upload yur file");
      alert.error('can\'t upload yur file');
      return;
    }
    var key = Date.now();
    var payload = {};
    //const fileName_ext = filename.split('.').slice(0, -1).join('.');
    payload[key] = {
      url: url,
      name: filename
    }
    const res = await fire.database().ref('/youFrame/').push(payload);
    return res;
  }

  const upload_file = ()=>{

    var file = selectedFile;
    if(!file){
      //console.log('select file first');
      alert.show('select file first');
      return;
    }
    var fileType = file.type.substring(0,5);
    if(fileType !== 'image'){
      //console.log('please select image only');
      alert.show('Please select image only')
      return;
    }
    var fileBytes= file.size;
    if(fileBytes >= 10048576){
      alert.error('file size is too large')
      //console.log('file size is too large')
      return;
    }
    var storageRef = storage.ref(`${file.name}`).put(file);
    storageRef.on(
      "state_changed",
      (snapshot) => {
        //var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        //console.log('Upload is ' + progress + '% done'); 
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            //console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            //console.log('Upload is running');
            setIsUploading(true);
            break;
        }
      },
      err => {
        console.log(err)
      },
      () => {
        storage
          .ref("/")
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            //console.log(url)
            set_image_url(file.name, url)
              .then(() => {
                alert.success('Image Uploaded')
                setSelectedFile(null)
                setIsUploading(false)
              })
          })
      }
    )
  }
  //console.log('file',selectedFile)
  return (
    (isUploading)?
    (
      <Loader
        style={{marginTop: '30px'}}
        type="Oval"
        color="#00BFFF"
        height={60}
        width={60}
      />
    )
    :
    (
      <div className="container" >
        <div className="file-field input-field">
          <div>
            <input
              required
              id = "files"
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              accept="image/*"
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button onClick={upload_file} className="btn light-blue" >Upload</button> 
      </div>
    )
  );
}

export default Upload;
