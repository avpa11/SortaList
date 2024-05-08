import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsUserAuth } from "./redux/slices/user";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/Dashboard";

// This component returns all the routes we will have on the platform
const AppRoutes = () => {
  const isUserAuth = useSelector(getIsUserAuth);
  return (
    <>
      <Routes>
        {/* These are all public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/instructions" element={<InstructionsPage />} /> {/* Add InstructionsPage route */}

        {isUserAuth && (
          <Route path="/dashboard" element={<DashboardPage />}></Route>
        )}
      </Routes>
    </>
  );
};

export default AppRoutes;
