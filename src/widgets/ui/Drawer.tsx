

/** == [ @imports ] 
 * == == == == == == == == == */
import React, { useState, useEffect, useRef } from "react";
import { 
   StyleSheet,
   View,
   Text, 
   DrawerLayoutAndroid,
   Button,
} from "react-native";


/** == [ properties ]
 * == == == == == == == == == */


/** == [ exports ]
 * == == == == == == == == == */
export default function Drawer( { ...props } ) {
   const 
      drawer = useRef<DrawerLayoutAndroid>(null)
      ,
      [ DrawerPosition, setDrawerPosition] = useState<'left' | 'right'>( 'left' )
      ,
      ChangeDrawerPosition = () => {
         DrawerPosition === 'left' ? (
            setDrawerPosition( 'right' )
         ) : (
            setDrawerPosition('left')
         );
      }
      ,
      navigationView = () => (
         <View style={[s.container, s.navigationContainer]}>
            <Text style={s.paragraph}>I'm in the Drawer!</Text>
            <Button
               title="Close drawer"
               // onPress={ () => drawer.current?.closeDrawer() }
               onPress={ () => props.ref.current?.closeDrawer() }
            />
         </View>
      )
   ;
 


   return(
      <DrawerLayoutAndroid
         // ref={ drawer }
         ref={ props.ref }
         drawerWidth={ 300 }
         drawerPosition={ DrawerPosition }
         renderNavigationView={ navigationView }>
            { props.children }
      </DrawerLayoutAndroid>
   );
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