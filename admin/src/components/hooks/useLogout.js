import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authState";
import { useSignoutMutation } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signout] = useSignoutMutation();

  const handleLogout = async () => {
    try {
      await signout().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log("Logout error:", err);
      dispatch(logout()); // Clear user even if API fails
      navigate("/");
    }
  };

  return handleLogout;
};
