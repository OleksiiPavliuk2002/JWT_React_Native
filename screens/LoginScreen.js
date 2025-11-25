import { useDispatch } from "react-redux";
import AuthContent from "../components/auth/AuthContent";
import * as authDataService from "../utils/authDataService";
import { authActions } from "../store/authSlice";

function LoginScreen() {
  const dispatch = useDispatch();

  async function loginHandler(credentials) {
    try {
      const response = await authDataService.login(
        credentials.login,
        credentials.password
      );

      if (response.status === 200) {
        dispatch(
          authActions.setUser({
            login: credentials.login,
            token: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          })
        );
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return <AuthContent isLogin={true} onAuthenticate={loginHandler} />;
}

export default LoginScreen;