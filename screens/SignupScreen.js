import { useDispatch } from "react-redux";
import AuthContent from "../components/auth/AuthContent";
import * as authDataService from "../utils/authDataService";
import { authActions } from "../store/authSlice";

function SignupScreen() {
  const dispatch = useDispatch();

  async function signupHandler(credentials) {
    try {
      const signupResponse = await authDataService.createUser(
        credentials.login,
        credentials.password
      );

      if (signupResponse.status === 200) {
        const loginResponse = await authDataService.login(
          credentials.login,
          credentials.password
        );

        if (loginResponse.status === 200) {
          dispatch(
            authActions.setUser({
              login: credentials.login,
              token: loginResponse.data.accessToken,
              refreshToken: loginResponse.data.refreshToken,
            })
          );
        }
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;