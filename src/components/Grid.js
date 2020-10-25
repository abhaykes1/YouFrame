import React,{useEffect, useState} from 'react';
import { database } from './fire';
import ImageCard from './ImageCard';
import Loader from 'react-loader-spinner'
function Grid() {
    const [images, setImages] = useState(null);
    useEffect(() => {
        let ref = database.ref('youFrame/');
        const listener = ref.on('value',(snapshot) => {
            //console.log(snapshot.val());
            var times = [];
            Object.entries(snapshot.val()).map(([key, value]) => {
                //console.log(value)
                times.unshift(value)
                return('');
            })
            //console.log(times)
            setImages(times);
        })
        
        return () => listener;

    }, []);

    return (
        <div  className="row">
            {
                (images)?
                (
                    images.map((key, val) => (
                        //console.log(key[Object.keys(key)]);
                        <div key={val} className="col s12 l4 m6">
                            <ImageCard 
                                imageUrl = {key[Object.keys(key)].url}
                                imageId = {val}
                                imageName = {key[Object.keys(key)].name}
                            />
                        </div>
                    ))
                )
                :
                (
                    <Loader
                        style={{marginTop: '30px'}}
                        type="Oval"
                        color="#00BFFF"
                        height={60}
                        width={60}
                    />
                )
            }
            
        </div>
    );
}

export default Grid;
