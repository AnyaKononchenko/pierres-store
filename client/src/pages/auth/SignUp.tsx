import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { UserDocument } from "@customTypes/users";
import UserForm from "components/user/UserForm";

const emptyUser: UserDocument = {
  name: "",
  email: "",
  password: "",
  address: "",
};

const SignUp = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Sign Up to Pierre's</title>
      </Helmet>
      <UserForm variant='create' initialState={emptyUser} />
    </HelmetProvider>
  );
};

export default SignUp;
