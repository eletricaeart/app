

import Home from "@/app/home/(tabs)/home";
import Customers from "@/app/home/(tabs)/customers";
import Budgets from "@/app/home/(tabs)/budgets";
import ReceiptsView from "@/app/home/(tabs)/receipts";
import Dev from "@/app/home/(tabs)/dev";
import Invoice from "@/app/home/(tabs)/invoice";
import SignInView from "./signin";
import SignUpView from "./signup";

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