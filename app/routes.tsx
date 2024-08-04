

import Home from "@/app/(tabs)/home";
import Customers from "@/app/(tabs)/customers";
import Budgets from "@/app/(tabs)/budgets";
import ReceiptsView from "@/app/(tabs)/receipts";
import Dev from "@/app/(tabs)/dev";
import Invoice from "@/app/(tabs)/invoice";
import SignInView from "./(auth)/sign-in";
import SignUpView from "./(auth)/sign-up";

const Routes = {
   Home,
   Customers,
   ReceiptsView,
   Budgets,
   Dev,
   tabs: {
      Invoice,
      
   },
   auth: {
      SignInView,
      SignUpView,
   }
};

export default Routes; 