import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CategoriesBoard, Dashboard, Home, Login, ProductsBoard, Profile, Store, UsersBoard, CreateProduct, CreateCategory, Verify, ForgottenPassword, RecoverPassword} from "pages";
import { Footer, Header } from "components";
import LoggedInRoute from "./LoggedInRoute";
import AdminRoute from "./AdminRoute";
import SignUp from "pages/auth/SignUp";

const Index = () => {
  return (
    <>
      <Router>
        <Header />
        <main className=' min-h-[80vh]'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/store' element={<Store />} />

            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signup/verify' element={<Verify />} />
            <Route path='/forgotten-password' element={<ForgottenPassword />} />
            <Route path='/password-recovery' element={<RecoverPassword />} />
            
            <Route element={<LoggedInRoute />}>
              <Route path='/profile' element={<Profile />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />

              <Route path='/products-board' element={<ProductsBoard />} />
              <Route path='/users-board' element={<UsersBoard />} />
              <Route path='/categories-board' element={<CategoriesBoard />} />

              <Route path='/create-product' element={<CreateProduct />} />
              <Route path='/create-category' element={<CreateCategory />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default Index;
