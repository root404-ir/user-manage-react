import { useState } from "react";
import Gallery from "./gallery";
import AddGallery from "./addGallery";

const Photo = () => {
    const [photos, setPhotos] = useState([])

    const addPhoto = (url) => {
        setPhotos(prevPhotos => [...prevPhotos, url])
    }
    return (
        <div>
            <AddGallery addPhoto={addPhoto}/>
            <Gallery photos={photos}/>
        </div>
    )
}
export default Photo