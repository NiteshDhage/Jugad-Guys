import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";


import Signup from "../pages/Signup";
import Tracker from "../pages/PeriodTracker";
import Navbar from "../components/Navbar";
import CycleHistory from "../pages/CycleHistory";
import PCODPredict from "../pages/PCODpredict";
import PCOSPredict from "../pages/PCOSpredict";


const AppRoutes = () => {


  return (
    <BrowserRouter>
      <Navbar />
      {/* 
      {user && <Sidebar />}

      <ToastNotification /> */}
      

      <Routes>
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/PTracker" element={<Tracker />} />
        <Route path="/CycleHistory" element={<CycleHistory />} />
        <Route path="/PCOD" element={<PCODPredict />} />
        <Route path="/PCOS" element={<PCOSPredict />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
