import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Signup from "../pages/Signup";

const AppRoutes = () => {


  return (
    <BrowserRouter>
      {/* {user && <Navbar />}
      {user && <Sidebar />}

      <ToastNotification /> */}
      

      <Routes>
        <Route path="/SignUp" element={<Signup />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
