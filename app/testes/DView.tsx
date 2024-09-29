

/** == [ @imports ] 
 * == == == == == == == == == */
import React, { useState, useEffect } from "react";
import { 
   StyleSheet,
   View,
   Text, 
} from "react-native";
import DrawerStack from "@/src/widgets/ui/drawer/";
import { Btn } from "@/src/widgets/ui/animated";


/** == [ properties ]
 * == == == == == == == == == */


/** == [ exports ]
 * == == == == == == == == == */
export default function DView( { ...props } ) {
   const 
      [ Openned, setOpenned ] = useState( false )
   ;

   return( 
      <DrawerStack
         direction="right"
         openerState={ Openned } 
         drawer={
            <View style={{ backgroundColor: "#212329", flex: 1, }}>
               <View style={{ backgroundColor: "#2af", height: 56, }}></View>
            </View>
         }
      >
         <Text>oi</Text>
         <Btn 
            title={ Openned ? "close Drawer" : "open Drawer" }
            onPress={ () => {
               async function load() {
                  setOpenned( true );
               }
               load().then( () => setOpenned( false ) );
            } }
         />
      </DrawerStack>
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
   } )
;