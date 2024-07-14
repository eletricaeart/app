

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
import Home from "../pages/Home";


export default function BottomNavBar( props ) {
   const 
      MusicRoute = () => <Text>Music</Text>
      ,
      AlbumsRoute = () => <Text>Albums</Text>
      ,
      RecentsRoute = () => <Text>Recents</Text>
      ,
      HomeRoute = () => {
         <HomePage page={ () => <Home /> }>
            {/* <Home /> */}
         </HomePage>
      }
   ;

   const [index, setIndex] = React.useState(0);

   const [routes] = React.useState( [
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
         key: 'albums'
         , 
         title: 'Albums'
         , 
         focusedIcon: 'album'
         , 
         color: "#fc0fc0"
         ,  
      },
      { 
         key: 'recents'
         , 
         title: 'Recents'
         , 
         focusedIcon: 'history'
         , 
      },
      { 
         key: 'home'
         , 
         title: 'Home'
         , 
         focusedIcon: 'bell'
         , 
         unfocusedIcon: 'bell-outline' 
      },
   ] );
 
   const renderScene = BottomNavigation.SceneMap( {
      music: MusicRoute,
      albums: AlbumsRoute,
      recents: RecentsRoute,
      home: HomeRoute,
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