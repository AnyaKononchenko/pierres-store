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
        className='flex flex-col gap-4 w-full'
      >
        <div className='flex gap-2 justify-center items-center my-2'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <button type='submit'>Recover Password</button>
      </form>
    </section>
  );
};

export default ForgottenPassword;
