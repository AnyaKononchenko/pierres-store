import { forgottenPassword } from "features/authSlice";
import React, { useState } from "react";
import { useAppDispatch } from "redux/hooks";

const ForgottenPassword = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  };

  const handlePasswordRecovery = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    console.log(email)
    dispatch(forgottenPassword(email))
  };

  return (
    <section className='flex flex-col gap-4 w-[90vw] mx-auto my-8 p-4'>
      <h2 className='font-bold text-zinc-300 text-[1.5rem] text-center'>
        Password Recovery
      </h2>
      <form
        onSubmit={handlePasswordRecovery}
        className='flex flex-col gap-4 w-full lg:w-[30vw] bg-[#FDC175] border-[#A8824F] border-4 mx-auto p-4'
      >
        <div className='flex gap-2 justify-center items-center my-2'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
            className='bg-inherit border-b-[#A8824F] border-b-4'
          />
        </div>
        <button type='submit' className="rounded-md mt-3 mx-auto p-2 bg-[#c7a16f] text-zinc-600 hover:bg-zinc-600 hover:text-[#A8824F] hover:font-bold duration-100">Recover Password</button>
      </form>
    </section>
  );
};

export default ForgottenPassword;
