import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CategoriesBoard, Dashboard, Home, Login, ProductsBoard, Profile, Store, UsersBoard, CreateProduct, CreateCategory, CreateUser } from "pages";
import { Header } from "components";
import LoggedInRoute from "./LoggedInRoute";
import AdminRoute from "./AdminRoute";

const Index = () => {
  return (
    <>
      <Router>
        <Header />
        <main className='font-gothic'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/store' element={<Store />} />
            <Route path='/login' element={<Login />} />
            
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
              <Route path='/create-user' element={<CreateUser />} />
            </Route>
          </Routes>
        </main>
      </Router>
    </>
  );
};

export default Index;
