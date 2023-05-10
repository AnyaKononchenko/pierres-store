import React, { useState } from "react";
import { Helmet } from "react-helmet";

import { Login as LoginState } from "@customTypes/users";
import { login as loginService } from "services/authService";
import { useAppDispatch } from "redux/hooks";
import { login } from "../../features/userSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const [loginData, setLoginData] = useState<LoginState>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await loginService(loginData);
    dispatch(login(response.payload));
  };

  return (
    <div>
      <Helmet>
        <title>Login To Pierre's</title>
      </Helmet>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={loginData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={loginData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
