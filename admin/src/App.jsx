import React from "react";
import Login from "./components/pages/Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import NotFound from "./components/shared/NotFound";
import Layout from "./components/shared/Layout";
import Managers from "./components/pages/Managers";
import Provinces from "./components/pages/Provinces";
import Districts from "./components/pages/Districts";
import Branches from "./components/pages/Branches";
import Services from "./components/pages/Services";
import Staff from "./components/pages/Staff";
import Inquiries from "./components/pages/Inquiries";
import Reviews from "./components/pages/Reviews";
import Gallery from "./components/pages/Gallery";
import TrustedCustomers from "./components/pages/TrustedCustomers";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="font-extralight">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user?.isAuth ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/not-found" element={<NotFound />} />
          
          {user?.isAuth ? (
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/managers" element={<Managers />} />
                  <Route path="/provinces" element={<Provinces />} />
                  <Route path="/districts" element={<Districts />} />
                  <Route path="/branches" element={<Branches />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/staff" element={<Staff />} />
                  <Route path="/inquiries" element={<Inquiries />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/trusted-customers" element={<TrustedCustomers />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            } />
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
