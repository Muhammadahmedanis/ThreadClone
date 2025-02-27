import React, { useActionState, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaImages } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { BiLoaderCircle } from "react-icons/bi";
import usePreviewImage from "../hooks/usePreviewImage";
import { addPost } from "../redux/slices/postSlice";
import { openPostModel } from "../redux/slices/modelSlice";

function CreatePost() {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.model.postModel);
  const { handleImageChange, imgUrl } = usePreviewImage()
  const[_, submitAction, isPending] = useActionState(async (previousState, formData) => {
    const text = formData.get("text");
    const payload = {
      text,
      img: imgUrl,
    };
    console.log(payload);
    // await dispatch(addPost(payload));
    setIsModelOpen(false);
  })

  return (
    <>
      {isOpen && (
        <div className="fixed top-20 px-5 inset-0 z-50 flex items-center justify-center bg-[#0000007a] bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5 relative">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-xl font-semibold text-gray-900">Create a Thread</h3>
              <button onClick={() => dispatch(openPostModel(false))} className="text-gray-400 hover:text-gray-900">
                <IoClose size={24} className="cursor-pointer" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-4">
              <form action={submitAction} className="space-y-2">
                <div className="flex gap-4 items-center pb-3">
                  <img
                    src="/zuck-avatar.png"
                    alt="Profile"
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="w-full">
                    <p className="text-sm font-medium py-2">Mark Zuckerberg</p>
                    <textarea 
                      name="text"
                      placeholder="Start a thread..."
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      rows={3}
                    ></textarea>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="flex flex-col items-center">
                  {imgUrl ? (
                    <img
                      src={URL.createObjectURL(imgUrl)}
                      className="w-full h-40 object-cover rounded-lg border border-gray-300"
                      alt="Preview"
                    />
                  ) : (
                    <div className="w-full h-40 flex flex-col items-center justify-center border border-gray-300 rounded-lg cursor-pointer">
                      <FaImages size={40} className="text-gray-400" />
                      <p className="text-gray-500">Upload an image</p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="file" className="mt-2 cursor-pointer text-blue-600 hover:underline">
                    {file ? "Change Image" : "Choose an Image"}
                  </label>
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full bg-blue-700 flex cursor-pointer justify-center text-white font-medium rounded-lg px-5 py-2.5 hover:bg-blue-800">
                 { isPending ? ( <BiLoaderCircle className="size-7 animate-spin" /> ) : "Post Thread"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreatePost;
