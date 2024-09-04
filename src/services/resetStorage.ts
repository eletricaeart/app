


import * as CStore from "@/src/widgets/clb-dbs";


export default function ResetStorage() {
   
   [  
      "budgetHook", 
      "customers", 
      "budgetData", 
      "budgets", 
   ].forEach( item => CStore.DeleteData( item ) );
}