import { useState } from "react"

const usePreviewImage = () => {
    const[imgUrl, setImageUrl] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageUrl(file);
            // const reader = new FileReader();
            // reader.onloadend = () => {
            // }
            // reader.readAsDataURL(file);
        }
    }
    return { imgUrl, handleImageChange }
}

export default usePreviewImage;