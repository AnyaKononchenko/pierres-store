import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, Login, Profile, Store } from "pages";
import { Header } from "components";
import LoggedInRoute from "./LoggedInRoute";

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
          </Routes>
        </main>
      </Router>
    </>
  );
};

export default Index;
