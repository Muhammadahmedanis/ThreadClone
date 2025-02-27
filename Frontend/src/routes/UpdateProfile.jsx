import React, { useState } from 'react';
import Label from '../components/Label';
import Input from '../components/Input';
import { BiLoaderCircle } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../redux/slices/authSlice';
import usePreviewImage from '../hooks/usePreviewImage';
import { openEditModel } from '../redux/slices/modelSlice';

function UpdateProfile() {
  const dispatch = useDispatch();
  const { handleImageChange, imgUrl } = usePreviewImage();
  const { editModel } = useSelector(state => state.model);

  const userInfo = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      img: imgUrl,
      userName: formData.get('userName'),
      email: formData.get('email'),
      bio: formData.get('bio'),
    };
    await dispatch(updateUserProfile(payload));
    setIsOpen(false);
  };

  return (
    <>
      {editModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-semibold">Update Profile</h2>
              <button onClick={() => dispatch(openEditModel(false))} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                <IoClose size={24} />
              </button>
            </div>

            {/* Profile Image */}
            <div className="flex flex-col items-center mt-4">
              <label htmlFor="file" className="cursor-pointer">
                <img
                  className="w-24 h-24 object-cover border border-gray-400 rounded-full"
                  src={
                    userInfo?.img
                      ? userInfo?.img
                      : imgUrl
                      ? URL.createObjectURL(imgUrl)
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3jhpAFYpzxx39DRuXIYxNPXc0zI5F6IiMQ&s'
                  }
                  alt="Profile"
                />
              </label>
              <input type="file" id="file" style={{ display: 'none' }} onChange={handleImageChange} />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <Label htmlFor="LoggingUserName" labelName="User Name" />
                <Input type="text" name="userName" placeholder="John Doe" required />
              </div>

              <div>
                <Label htmlFor="LoggingEmailAddress" labelName="Email Address" />
                <Input type="email" name="email" placeholder="abc@gmail.com" required />
              </div>

              <div>
                <Label htmlFor="LoggingBio" labelName="Bio" />
                <Input type="text" name="bio" placeholder="I am a developer" />
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateProfile;
