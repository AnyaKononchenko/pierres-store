import { recoverPassword } from "features/authSlice";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";

const RecoverPassword = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [password, setPassword] = useState("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordRecovery = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    console.log(password);
    dispatch(recoverPassword({ token: searchParams.get("token"), password }));
  };

  return (
    <section>
      <h2>Password Recovery</h2>
      <form
        onSubmit={handlePasswordRecovery}
        className='flex flex-col gap-4 w-full'
      >
        <div className='flex gap-2 justify-center items-center my-2'>
          <label htmlFor='password'>New Password:</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit'>Recover Password</button>
      </form>
    </section>
  );
};

export default RecoverPassword;
