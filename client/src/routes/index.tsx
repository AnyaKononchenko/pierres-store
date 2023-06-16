import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  CategoriesBoard,
  Dashboard,
  Home,
  Login,
  ProductsBoard,
  Profile,
  Store,
  UsersBoard,
  CreateProduct,
  CreateCategory,
  Verify,
  ForgottenPassword,
  RecoverPassword,
  ProductDetails,
  Cart,
  UnderConstruction,
  NotFound,
} from "pages";
import { LoginVariant } from "@customTypes/common";
import { Footer, Header } from "components";
import LoggedInRoute from "./LoggedInRoute";
import AdminRoute from "./AdminRoute";
import SignUp from "pages/auth/SignUp";

const Index = () => {
  return (
    <>
      <Router>
        <Header />
        <main className='min-h-[80vh] flex justify-center bg-mainBackground bg-cover bg-no-repeat bg-top'>
          <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/store' element={<Store />} />
            <Route path='/products/:slug' element={<ProductDetails />} />

            <Route path='/login' element={<Login variant={LoginVariant.regular}/>} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signup/verify' element={<Verify />} />
            <Route path='/forgotten-password' element={<ForgottenPassword />} />
            <Route path='/password-recovery' element={<RecoverPassword />} />

            <Route path='/under-construction' element={<UnderConstruction />} />

            <Route element={<LoggedInRoute />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/cart' element={<Cart />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />

              <Route path='/products-board' element={<ProductsBoard />} />
              <Route path='/users-board' element={<UsersBoard />} />
              <Route path='/categories-board' element={<CategoriesBoard />} />

              <Route path='/create-product' element={<CreateProduct />} />
              <Route path='/create-category' element={<CreateCategory />} />
            </Route>

            <Route path='*' element={<NotFound />} />

          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default Index;
