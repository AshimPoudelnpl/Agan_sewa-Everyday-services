import React from "react";
import Login from "./components/pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import NotFound from "./components/shared/NotFound";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="font-extralight">
      <BrowserRouter>
        {user?.isAuth }
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
