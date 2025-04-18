import { useState } from "react"

const usePreviewImage = () => {
    const[imgUrl, setImageUrl] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageUrl(file);
        }
    }
    return { imgUrl, handleImageChange, setImageUrl }
}

export default usePreviewImage;