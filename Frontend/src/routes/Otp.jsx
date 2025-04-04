import React, { useActionState, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resendOtp, verifyOtp } from '../redux/slices/authSlice';
import { BiLoaderCircle } from 'react-icons/bi';
import { useAuthQuery } from '../redux/hooks/useAuthQuery';

export const getData = (data) => {
  console.log(data);
  return data;
};


const Otp = () => {
  const { verifyOtpMutation, resendOtpMutation } = useAuthQuery();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.user);
  const user = JSON.parse(localStorage.getItem("user"))
  const [otpNum, setOtpNum] = useState(["", "", "", "", "", ""]);
  const[disable, setDisable] = useState(false);

  const [_, submitAction, isPending] = useActionState(async (previousState, formData) => {
    const otp = otpNum.join('');
    verifyOtpMutation.mutate(otp, {
      onSuccess: () => {
        setOtpNum(["", "", "", "", "", ""]);
        navigate("/");
      },
    });
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

const handleNewOtp = () => {
  if (user) {
    resendOtpMutation.mutate({ email: user.email, _id: user.id })
  } 
  
};

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
                { verifyOtpMutation.isPending && <BiLoaderCircle className="size-7 animate-spin" /> } 
          </button>
        </div>
      </form>
      <div className="text-sm text-slate-500 mt-4">
        Didn't receive code?{' '}
        <button onClick={handleNewOtp} className="font-medium cursor-pointer text-[#343434] hover:text-[#343434df]"> Resend </button>
      </div>
    </div>
    </div>
  );
};

export default Otp;