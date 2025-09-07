import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { AppContextsProvider } from "./contexts/AppContext.jsx";
import AccessPage from "./pages/AccessPage.jsx";
import LikesPage from "./pages/LikesPage.jsx";
import { Toaster } from "react-hot-toast";
import DiscoverPage from "./pages/DiscoverPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import ContactUsPage from "./pages/ContactUsPage.jsx";
import App from "./App.jsx";
import Error404Page from "./pages/Error404Page.jsx";
import ScrollContentPage from "./pages/ScrollContentPage.jsx";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import ProfilePage from "./pages/ProfilePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import AddContentPage from "./pages/AddContentPage.jsx";
import { registerSW } from "virtual:pwa-register";
import AddEditContentContextProvider from "./contexts/AddEditContentContext.jsx";

const updateSW = registerSW({
  onNeedRefresh() {
    if (
      confirm("Une nouvelle version est disponible. Voulez-vous recharger ?")
    ) {
      updateSW(true);
    }
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ScrollContentPage key={"home"} pageType={"home"} path={"/content"} />
        ),
      },
      {
        path: "/content/:slug",
        element: (
          <ScrollContentPage
            key={"content"}
            pageType={"content"}
            path={"/content/"}
          />
        ),
      },
      {
        path: "/category/:slug",
        element: (
          <ScrollContentPage
            key={"category"}
            pageType={"category"}
            path={"/content/category/"}
          />
        ),
      },
      {
        path: "/discover",
        element: <DiscoverPage />,
      },
      {
        path: "/login",
        element: <AccessPage accessType={"login"} />,
      },
      {
        path: "/signup",
        element: <AccessPage accessType={"signup"} />,
      },
      {
        path: "/verify-account",
        element: <AccessPage accessType={"unverified-account"} />,
      },
      {
        path: "/reset-password/:ticketId",
        element: <AccessPage accessType={"reset-password"} />,
      },

      {
        path: "/my-likes",
        element: <LikesPage />,
      },
      {
        path: "/my-likes/:slug",
        element: (
          <ScrollContentPage
            key={"likes"}
            pageType={"likes"}
            path={"/content/likes/"}
          />
        ),
      },
      {
        path: "/privacy-policy",
        element: <TermsPage key={"pp"} type={"pp"} />,
      },
      {
        path: "/terms-of-use",
        element: <TermsPage key={"tos"} type={"tos"} />,
      },
      {
        path: "/contact-us",
        element: <ContactUsPage />,
      },
      { path: "/settings", element: <SettingsPage /> },
      {
        path: "/404-error",
        element: <Error404Page />,
      },

      {
        path: "/add-content",
        element: (
          <AddEditContentContextProvider>
            <AddContentPage key={"add"} pageType={"add-content"} />
          </AddEditContentContextProvider>
        ),
      },
      {
        path: "/edit-content/:slug",
        element: (
          <AddEditContentContextProvider>
            <AddContentPage key={"edit"} pageType={"edit-content"} />
          </AddEditContentContextProvider>
        ),
      },
      {
        path: "/:username",
        element: <ProfilePage />,
      },
      {
        path: "/:username/:slug",
        element: (
          <ScrollContentPage
            key={"profile"}
            pageType={"profile"}
            path={"/user"}
          />
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppContextsProvider>
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Toaster />
      <RouterProvider router={router} />
    </SkeletonTheme>
  </AppContextsProvider>
);
