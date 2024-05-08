import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsUserAuth } from "./redux/slices/user";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/Dashboard";
import OnboardingPage from "./pages/Onboarding";
import MiddleContentWithTopBarLayout from "./components/layouts/ContentWithTopNavBarLayout";
import ContentWithNoNavBarLayout from "./components/layouts/ContentWithNoNavBarLayout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import GuestLoginPage from "./pages/GuestLoginPage";

// This component returns all the routes we will have on the platform
const AppRoutes = () => {
  const isUserAuth = useSelector(getIsUserAuth);
  return (
    <>
      <Routes>
        {/* These are all public routes */}
        <Route
          element={
            <MiddleContentWithTopBarLayout
              style={{
                backgroundImage: `url(${
                  process.env.PUBLIC_URL + "/images/background_lp.png"
                })`,
              }}
            />
          }
        >
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* onboarding routes */}
        <Route
          element={
            <ContentWithNoNavBarLayout
              style={{
                backgroundImage: `url(${
                  process.env.PUBLIC_URL + "/images/background_onboarding.png"
                })`,
              }}
            />
          }
        >
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Route>
        <Route
          element={
            <ContentWithNoNavBarLayout
              style={{
                backgroundImage: `url(${
                  process.env.PUBLIC_URL + "/images/background_onboarding.png"
                })`,
              }}
            />
          }
        >
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route
          element={
            <ContentWithNoNavBarLayout
              style={{
                backgroundImage: `url(${
                  process.env.PUBLIC_URL + "/images/background_onboarding.png"
                })`,
              }}
            />
          }
        >
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>
        <Route
          element={
            <ContentWithNoNavBarLayout
              style={{
                backgroundImage: `url(${
                  process.env.PUBLIC_URL + "/images/background_onboarding.png"
                })`,
              }}
            />
          }
        >
          <Route path="/guest" element={<GuestLoginPage />} />
        </Route>

        {isUserAuth && (
          <Route element={<MiddleContentWithTopBarLayout />}>
            <Route path="/dashboard" element={<DashboardPage />}></Route>
          </Route>
        )}
      </Routes>
    </>
  );
};

export default AppRoutes;
