

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


/** == [ exports ]
 * == == == == == == == == == */
export default function DrawerView( { ...props } ) {

   const drawer = useRef<DrawerLayoutAndroid>(null);
   const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>(
     'left',
   );
   const changeDrawerPosition = () => {
     if (drawerPosition === 'left') {
       setDrawerPosition('right');
     } else {
       setDrawerPosition('left');
     }
   };
 
   const navigationView = () => (
     <View style={[ s.container ,  s.navigationContainer ]}>
       <Text style={ s.paragraph }>I'm in the Drawer!</Text>
       <Btn
         title="Close drawer"
         onPress={() => drawer.current?.closeDrawer()}
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
          {/* <Text style={ s.paragraph }>Drawer on the {drawerPosition}!</Text>
          <Btn
            title="Change Drawer Position"
            onPress={() => changeDrawerPosition()}
          />
          <Text style={ s.paragraph }>
            Swipe from the side or press button below to see it!
          </Text>
          <Btn
            title="Open drawer"
            onPress={() => drawer.current?.openDrawer()}
          /> */}
          {/* <Btn
            title="Open drawer"
            onPress={() => drawer.current?.openDrawer()}
          /> */}
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