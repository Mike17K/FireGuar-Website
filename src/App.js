import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from "./utils/PrivateRoute.js";

import Layout from "./pages/Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import NoPage from "./pages/NoPage/NoPage.jsx";
import ForestsPage from "./pages/Forests/Forests.jsx";
import MapPage from "./pages/MapPage/MapPage.jsx";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage.jsx";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="forests" element={<PrivateRoute />}>
              <Route index element={<ForestsPage />} />
            </Route>

            <Route path="map" element={<PrivateRoute />}>
              <Route index element={<MapPage />} />
            </Route>

            <Route path="contactus" element={<ContactUsPage />} />
          </Route>

          <Route path="sign_in" element={<SignIn />} />

          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
