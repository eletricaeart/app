

/** == [ @imports ] 
 * == == == == == == == == == */
import { Btn } from "@/src/widgets/ui/animated";
import React, { useState, useEffect, useRef } from "react";
import { 
   StyleSheet,
   View,
   Text, 
   DrawerLayoutAndroid,
} from "react-native";


/** == [ properties ]
 * == == == == == == == == == */
type direction = "left" | "right";

type DrawerProps = {
   direction?: direction;
   children?: any;
   open?: () => void;
   close?: () => void;
   openned?: boolean;
   drawer?: any;
};

/** == [ exports ]
 * == == == == == == == == == */
export default function Drawer( { ...props }: DrawerProps ) {
   const 
      drawer = useRef<DrawerLayoutAndroid>(null)
      ,
      // [ drawerPosition, setDrawerPosition ] = useState<'left' | 'right'>(
      [ drawerPosition, setDrawerPosition ] = useState<direction>(
         props.direction || 'left',
      )
   ;
   const changeDrawerPosition = () => {
      if( drawerPosition === 'left' ) {
         setDrawerPosition('right');
      } else {
         setDrawerPosition('left');
      }
   };

   props.open = () => drawer.current?.openDrawer();
   props.close = () => drawer.current?.closeDrawer();
 
   const navigationView = () => props.drawer || (
      <View style={[ s.container ,  s.navigationContainer ]}>
         <Text style={ s.paragraph }>I'm in the Drawer!</Text>
         <Btn
            title="Close drawer"
            onPress={ () => drawer.current?.closeDrawer() }
         />
      </View> 
   );



   return( <>
      <DrawerLayoutAndroid
         ref={drawer}
         drawerWidth={300}
         drawerPosition={drawerPosition}
         renderNavigationView={navigationView}>
         <View style={ s.container }>
            {
               props.openned &&
                  drawer.current?.openDrawer()
            }
            { props.children }
         </View>
      </DrawerLayoutAndroid>
   </> );
}


/** == [ StyleSheet ]
 * == == == == == == == == == */
const 
   s = StyleSheet.create( {
      sheet: {
         flex: 1,
         alignItems: "center",
         justifyContent: "center",
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      },
      navigationContainer: {
        backgroundColor: '#ecf0f1',
      },
      paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: 'center',
      },
   } )
;