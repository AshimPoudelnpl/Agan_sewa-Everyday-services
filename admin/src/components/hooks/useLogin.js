import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/authState";
import { useLoginMutation } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // RTK Query hook that provides login mutation function and loading/error states
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async (formData) => {
    try {
      const result = await login(formData).unwrap();
      dispatch(setUser(result));
      navigate("/dashboard");
    } catch (err) {
      console.log("Login error:", err.data?.message);
    }
  };

  return { handleLogin, isLoading, error };
};
