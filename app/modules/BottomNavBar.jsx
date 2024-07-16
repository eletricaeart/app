

import React from "react";
import {
   StyleSheet,
   View,
   Button,
} from "react-native";
import {
   BottomNavigation,
   Text 
} from "react-native-paper";
import colors from "../assets/stylesheets/globals/colors";

/* == [ pages ]
== == == == == == == == == */
import HomePage from "./HomePage";
import Routes from "../pages/routes";


export default function BottomNavBar( props ) {
   const 
      HomeRoute = () => (
         <HomePage page={ <Routes.Home /> }/>
      )
      ,
      CustomersRoute = () => <HomePage page={ <Routes.Customers /> } />
      ,
      RecentsRoute = () => <Text>Recents</Text>
      ,
      MusicRoute = () => <Text>Music</Text>
   ;

   const [index, setIndex] = React.useState(0);

   const [routes] = React.useState( [
      { 
         key: 'home'
         , 
         title: 'Home'
         , 
         focusedIcon: 'bell'
         , 
         unfocusedIcon: 'bell-outline' 
      },
      { 
         key: 'customers'
         , 
         title: 'Clientes'
         , 
         focusedIcon: 'album'
         , 
         color: "#fc0fc0"
         ,  
      },
      { 
         key: 'music'
         , 
         title: 'Favorites'
         , 
         focusedIcon: 'heart'
         , 
         unfocusedIcon: 'heart-outline'
      },
      { 
         key: 'recents'
         , 
         title: 'Recents'
         , 
         focusedIcon: 'history'
         , 
      },
   ] );
 
   const renderScene = BottomNavigation.SceneMap( {
      home: HomeRoute,
      customers: CustomersRoute,
      music: MusicRoute,
      recents: RecentsRoute,
   } );
 
   return (
      <BottomNavigation
         navigationState={ { index, routes } }
         onIndexChange={ setIndex }
         renderScene={ renderScene }
         sceneAnimationType={ "shifting" || "opacity" }
         shifting={ true }
         labeled={ true }
         compact={ true }
         activeColor={ colors.bottomNavigationBar_activeColor }
         inactiveColor={ colors.bottomNavigationBar_activeColor }
         keyboardHidesNavigationBar={ true }
         barStyle={ { backgroundColor: colors.bottomNavigationBar } }
      />
   );
}

const 
   style = StyleSheet.create( {
      BottomNavBar: {
         backgroundColor: "#16181c",
         height: 68,
      }
   } )
;