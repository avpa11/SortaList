import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsUserAuth } from "./redux/slices/user";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/Dashboard";
import InstructionsPage from "./pages/InstructionsPage"; // Import InstructionsPage
import AboutUsPage from "./pages/AboutUsPage"; // Import InstructionsPage

// This component returns all the routes we will have on the platform
const AppRoutes = () => {
  const isUserAuth = useSelector(getIsUserAuth);
  return (
    <>
      <Routes>
        {/* These are all public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/instructions" element={<InstructionsPage />} /> {/* Add InstructionsPage route */}
        <Route path="/about-us" element={<AboutUsPage />} /> {/* Add InstructionsPage route */}

        {isUserAuth && (
          <Route path="/dashboard" element={<DashboardPage />}></Route>
        )}
      </Routes>
    </>
  );
};

export default AppRoutes;
