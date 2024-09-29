

/** == [ @imports ] 
 * == == == == == == == == == */
import React, { useState, useEffect } from "react";
import { 
   StyleSheet,
   View,
   Text, 
} from "react-native";
import Drawer from "@/src/widgets/ui/drawer";
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
      <Drawer
         direction="right"
         openned={ Openned } 
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
      </Drawer>
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