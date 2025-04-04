// const userInfo = JSON.parse(localStorage.getItem('user'));
// const myInfo = useOutletContext();
// console.log(data);
// const formData = new FormData(e.target);
// import { useUserQuery } from '../redux/hooks/useUserQuery';
// import Input from '../components/Input';

import { useEffect, useState } from 'react';
import Label from '../components/Label';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import usePreviewImage from '../hooks/usePreviewImage';
import { openEditModel } from '../redux/slices/modelSlice';
import { useAuthQuery } from '../redux/hooks/useAuthQuery';
import { BiLoaderCircle } from 'react-icons/bi';

function UpdateProfile({ data }) {
  const dispatch = useDispatch();
  const { handleImageChange, imgUrl } = usePreviewImage();
  const { editModel } = useSelector(state => state.model);
  const { updateProfileMutation } = useAuthQuery();

  const [Form, setForm] = useState({
    userName: data?.userName || '',
    email: data?.email || '',
    bio: data?.bio || '',
  });

  useEffect(() => {
    if (data) {
      setForm({
        userName: data.userName || '',
        email: data.email || '',
        bio: data.bio || '',
      });
    }
  }, [data]);

  
  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      img: imgUrl,
      userName: Form.userName,
      email: Form.email,
      bio: Form.bio,
    };
    console.log(payload);
    
    updateProfileMutation.mutate(payload, {
      onSuccess: () => {
        dispatch(openEditModel(false))
      },
    });
  };

  return (
    <>
      {editModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
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
                    imgUrl
                      ? URL.createObjectURL(imgUrl)           
                      : data?.profilePic                      
                        || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3jhpAFYpzxx39DRuXIYxNPXc0zI5F6IiMQ&s'  // fallback
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
                <input type="text" name="userName" value={Form.userName} onChange={handleChange}  required />
              </div>

              <div>
                <Label htmlFor="LoggingEmailAddress" labelName="Email Address" />
                <input type="email" name="email" value={Form.email} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="LoggingBio" labelName="Bio" />
                <input type="text" name="bio" value={Form.bio} onChange={handleChange}   />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-400 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-gray-500">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center">
                 { updateProfileMutation?.isPending ? ( <BiLoaderCircle className="size-7 animate-spin" /> ) : "Submit"}
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
