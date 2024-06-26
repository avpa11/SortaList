import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsUserAuth } from "./redux/slices/user";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import InsightsPage from "./pages/InsightsPage";
import OnboardingPage from "./pages/Onboarding";
import MiddleContentWithTopBarLayout from "./components/layouts/ContentWithTopNavBarLayout";
import ContentWithNoNavBarLayout from "./components/layouts/ContentWithNoNavBarLayout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import GuestLoginPage from "./pages/GuestLoginPage";
import InstructionsPage from "./pages/InstructionsPage";
import AboutUsPage from "./pages/AboutUsPage";
import TopBarLayout from "./components/layouts/NavBarWithContentLayout";
import AboutYouPage from "./pages/AboutYouPage";
import GamePage from "./pages/GamePage";
import SideBarWithContentLayout from "./components/layouts/SideBarWithContentLayout";
import NotFoundPage from "./pages/NotFoundPage";
import GameAnalytics from "./pages/GameAnalytics";
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
          <Route path="/about-you" element={<AboutYouPage />} />
        </Route>

        <Route element={<TopBarLayout />}>
          <Route path="/how-it-works" element={<InstructionsPage />}></Route>
        </Route>

        <Route element={<TopBarLayout />}>
          <Route path="/about-us" element={<AboutUsPage />}></Route>
        </Route>

        {isUserAuth && (
          <Route element={<SideBarWithContentLayout />}>
            <Route path="/dashboard" element={<DashboardPage />}></Route>
          </Route>
        )}

        {isUserAuth && (
          <Route element={<SideBarWithContentLayout />}>
            <Route path="/insights" element={<InsightsPage />}></Route>
          </Route>
        )}

        {isUserAuth && (
          <Route element={<SideBarWithContentLayout />}>
            <Route path="/gameanalytics" element={<GameAnalytics />}></Route>
          </Route>
        )}

        {isUserAuth && (
          <Route
            element={
              <MiddleContentWithTopBarLayout
                style={{
                  backgroundImage: `url(${
                    process.env.PUBLIC_URL + "/images/background_onboarding.png"
                  })`,
                }}
              />
            }
          >
            <Route path="/play" element={<GamePage />} />
          </Route>
        )}

        <Route
          element={
            <MiddleContentWithTopBarLayout
              style={{
                backgroundImage: `linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)`,
              }}
            />
          }
        >
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
