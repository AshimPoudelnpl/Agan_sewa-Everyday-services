import { useEffect } from "react";
import { useDispatch } from "react-redux";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useVerifyTokenQuery } from "../redux/features/authSlice";
import { logout } from "../redux/features/authState";

const Guard = ({ children }) => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const { data, error } = useVerifyTokenQuery();
  console.log(data);

  const expDate = new Date(data?.decoded.exp * 1000);
  const currentDate = new Date(data?.decoded.iat * 1000);
  console.log(expDate);
  console.log(currentDate);
  useEffect(() => {
    if (data?.decoded.exp) {
      const isExpired = data.decoded.exp * 1000 < Date.now();
      if (isExpired) {
        dispatch(logout());
      }
    }
  }, [data, error, dispatch]);

  return isAuth ? children : <Navigate to="/" />;
};

export default Guard;
