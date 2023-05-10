import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, Login, Profile } from "pages";
import { Header } from "components";
import LoggedInRoute from "./LoggedInRoute";

const Index = () => {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Routes>
              <Route path='/' element={<Home />} />
            <Route element={<LoggedInRoute />}>
              <Route path='/profile' element={<Profile />}/>
            </Route>
            <Route path='/login' element={<Login />} />
          </Routes>
        </main>
      </Router>
    </>
  );
};

export default Index;
