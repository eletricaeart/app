

import React from "react";

import {
   PageFooter,
   Fab,
} from "@/src/widgets/clb-widgets";

import { 
   BottomNavigation,
   Icon,
} from "react-native-paper";

import {
   StyleSheet,
   ScrollView,
   View,
   Text,
   Image,
} from "react-native";
import Routes from "./routes";


/* == [ BottomNavigation ]
== == == == == == == == == */
const 
   HomeRoute = () => (
      <Homepage page={ <Routes.Home /> } />
   )
   ,
   CustomersRoute = () => (
      <Homepage page={ <Routes.Customers /> } />
   )
   ,
   ReceiptsRoute = () => (
      <Homepage page={ <Routes.Receipts /> } />
   )
   ,
   BudgetsRoute = () => (
      <Homepage page={ <Routes.Budgets /> } />
   )
   ,
   DevRoute = () => (
      <Homepage page={ <Routes.Dev /> } />
   )
   ,
   NewCustomerRoute = () => (
      <Homepage page={ <Routes.NewCustomer /> } />
   )
;

export function BottomNavigationBar() {
   const 
      [ index, setIndex ] = React.useState( 0 )
      ,
      [ routes ] = React.useState( [
         {  
            key: 'home', title: 'Home', 
            focusedIcon: () => ( <Icon i="mc" name="electron-framework" color="#fc0"/> ), 
            unfocusedIcon: () => ( <Icon i="mi" name="electrical-services" color="#27f"/> ),
         },
         { 
            key: 'customers', title: 'Clientes', 
            focusedIcon: () => ( <Icon i="f" name="people-group" color="#27f"/> ),  
            unfocusedIcon: () => ( <Icon i="f" name="people-group" color="#fff"/> ), 
            
         },
         { 
            key: 'receipts', title: 'Recibos', 
            focusedIcon: () => ( <Icon i="mc" name="receipt" color="#27f"/> ), 
            unfocusedIcon: () => ( <Icon i="mc" name="receipt" color="#fff"/> ), 
         },
         { 
            key: 'budgets', title: 'Orçamentos', 
            focusedIcon: () => ( <Icon i="f" name="file-invoice-dollar" color="#27f"/> ), 
            unfocusedIcon: () => ( <Icon i="f" name="file-invoice-dollar" color="#fff"/> ), 
         },
         { 
            key: 'dev', title: 'Dev', 
            focusedIcon: () => ( <Icon i="mi" name="devices" color="#f55"/> ), 
            unfocusedIcon: () => ( <Icon i="mi" name="devices" color="#ffab00"/> ),
         },
         { 
            key: 'newCustomer', title: 'Cadastrar Cliente', 
            focusedIcon: () => ( <Icon i="mi" name="people" color="#f55"/> ), 
            unfocusedIcon: () => ( <Icon i="mi" name="people" color="#ffab00"/> ),
         },
      ] )
   ;

   const renderScene = BottomNavigation.SceneMap( {
      home: HomeRoute,
      customers: CustomersRoute,
      receipts: ReceiptsRoute,
      budgets: BudgetsRoute,
      dev: DevRoute,
      newCustomer: NewCustomerRoute,
   } );

   return( <>
      <BottomNavigation
      theme={{colors: {secondaryContainer: "#212329"}}}
         navigationState={ { index, routes } }
         onIndexChange={ setIndex }
         renderScene={ renderScene }
         // sceneAnimationType={ "shifting" || "opacity" }
         sceneAnimationType={ "opacity" }
         shifting={ true }
         labeled={ true }
         compact={ true }
         activeColor={ "#00559C" }
         inactiveColor={ "#fff" }
         keyboardHidesNavigationBar={ true }
         barStyle={ { backgroundColor: "#16181C", } }
      />
   </> );
};


export default function Homepage( { ...props } ) {


   return( <>
      <View style={{
         flex: 1,
         backgroundColor: "#212329",
      }}>
            { props.page }
      </View>
      <Fab />
   </> );
}