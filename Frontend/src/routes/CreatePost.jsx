import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { BiLoaderCircle } from "react-icons/bi";
import { openPostModel } from "../redux/slices/modelSlice";
import { usePostQuery } from "../redux/hooks/usePostQuery";
import { useUserQuery } from "../redux/hooks/useUserQuery";
import usePreviewImage from "../hooks/usePreviewImage";

function CreatePost() {
  const { myInfo } = useUserQuery();
  const dispatch = useDispatch();
  const { createPostMutation } = usePostQuery();
  const isOpen = useSelector((state) => state.model.postModel);

  const [text, setText] = useState("");
  const { imgUrl, handleImageChange, setImageUrl } = usePreviewImage();

  const submitAction = (e) => {
    e.preventDefault();

    if (!imgUrl) {
      console.log("No image selected!");
      return;
    }

    const formData = new FormData();
    formData.append("text", text);
    formData.append("img", imgUrl);

    createPostMutation.mutate(formData, {
      onSuccess: () => {
        dispatch(openPostModel(false));
        setText("");
        setImageUrl(null);
      },
    });
  };

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
              <form onSubmit={submitAction} className="space-y-4">
                <div className="flex gap-4 items-center pb-3">
                  <img
                    src={myInfo?.data?.profilePic || 'https://placehold.co/40x40'}
                    alt="Profile"
                    className="h-11 w-12 rounded-full border border-gray-300"
                  />
                  <div className="w-full">
                    <p className="text-sm font-medium py-2">{myInfo?.data?.userName}</p>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Start a thread..."
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      rows={3}
                    ></textarea>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label htmlFor="file" className="cursor-pointer">
                    <img
                      className="w-full h-40 rounded-lg border border-gray-300 object-cover"
                      src={imgUrl ? URL.createObjectURL(imgUrl) : "https://placehold.co/400x200?text=Upload+Image"}
                      alt="Preview"
                    />
                  </label>
                  <input type="file" id="file" hidden onChange={handleImageChange} />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-700 flex justify-center items-center text-white font-medium rounded-lg px-5 py-2.5 hover:bg-blue-800"
                >
                  {createPostMutation.isPending ? (
                    <BiLoaderCircle className="size-7 animate-spin" />
                  ) : (
                    "Post Thread"
                  )}
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
