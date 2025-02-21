import React, { useActionState, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import logo from '/logo.png';
// import { useApi } from '../helper/useApi';

export const getData = (data) => {
  console.log(data);
  return data;
};
 
const Otp = () => {
  const navigate = useNavigate()
  // let token = JSON.parse(localStorage.getItem("token"));
  const [otpNum, setOtpNum] = useState(["", "", "", "", "", ""]);
  const[disable, setDisable] = useState(false);

  const [user, submitAction, isPending] = useActionState(async (previousState, formData) => {
    const otp = otpNum.join('');
    
    // const data = await useApi("post", "auth/verify-email", {otp});
    // if(data){
    //   setOtpNum(["", "", "", "", "", ""]);
    //   navigate("/");
    // }
  });

  const handleChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otpNum];
    newOtp[index] = value;
    setOtpNum(newOtp);

    if (value && index < 5) {
      // Move focus to the next input when a digit is entered
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
    index == 5 && setDisable(true)
};

const handleNewOtp = async () => {
  try {
    // console.log(response?.data?.data?.email);
    // console.log(getData({ email: response?.data?.data?.email, _id: response?.data?.data?._id }));
    const result = getData({ email: response?.data?.data?.email, _id: response?.data?.data?._id });    
    // console.log(result, "data");
    const { email, _id } = result;
    const payload = {email, _id};
    const data = await useApi("post", "/auth/resend-otp", payload);
  } catch (error) {
    // toast.error(error.response?.data.message)
  }
}

const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otpNum[index] === "") {
        // Move focus to the previous input when backspace is pressed and the current input is empty
        if (index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#343434]">
    <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
      <header className="mb-4">
        <div className="text-center flex flex-col items-center text-xl font-bold">
        <img src='/dark-logo.svg' alt="" className="h-8 w-8" />
        <span className="text-xl">Thread</span>
        </div>
        <p className="text-[16px] text-slate-500">
          Enter the 6-digit verification code that was sent to your email.
        </p>
      </header>
      <form action={submitAction} id="otp-form">
        <div className="flex items-center justify-center gap-3">
          {otpNum.map((value, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              name='otp'
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength="1"
              inputMode="numeric"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          ))}
        </div>
        <div className="max-w-[260px] mx-auto mt-4">
          <button
            type='submit'
            disabled={isPending}  
            className={`w-full inline-flex gap-2 items-center cursor-pointer justify-center whitespace-nowrap rounded-lg ${!disable ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : 'bg-[#343434] hover:bg-[#343434df]'} px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150`}>
                <div className='text-[17px]'> Verify Otp</div>
                { isPending && <div className="w-6 h-6 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div> } 
          </button>
        </div>
      </form>
      <div className="text-sm text-slate-500 mt-4">
        Didn't receive code?{' '}
        <button onClick={handleNewOtp} className="font-medium text-[#343434] hover:text-[#343434df]"> Resend </button>
      </div>
    </div>
    </div>
  );
};

export default Otp;