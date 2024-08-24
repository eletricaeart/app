

import SignInView from "@/app/(auth)/sign-in";
import SignUpView from "@/app/(auth)/sign-up";
import AuthView from "@/app/(auth)/index";

const AuthRoutes = {
   auth: {
      AuthView,
      SignInView,
      SignUpView,
   }
};

export default AuthRoutes; 