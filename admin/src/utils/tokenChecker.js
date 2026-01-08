import { authAPIs } from "../redux/features/authSlice";
import store from "../redux/store";

export const checkTokenExpiry = async () => {
  try {
    const result = await store
      .dispatch(authAPIs.endpoints.verifyToken.initiate())
      .unwrap();
    console.log("Token is valid", result);
    return result;
  } catch {
    return false;
  }
};
