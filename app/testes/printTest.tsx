

/** == [ @imports ] 
 * == == == == == == == == == */
import React, { useState, useEffect } from "react";
import { 
   StyleSheet,
   View,
   Text,
   Button, 
} from "react-native";
import * as expoPrint from "expo-print";
import { shareAsync } from "expo-sharing";
import PrintFile from "@/src/widgets/functional/printFile";
import PrintFileNShare from "@/src/widgets/functional/printFileNShare";


/** == [ properties ]
 * == == == == == == == == == */
const 
   file1 = `
      <html>
         <head>
         </head>
         <body>
            <section>
               <h1>file 1</h1>
            </section>
         </body>
      </body>
   `
   ,
   file2 = `
      <html>
         <head>
         </head>
         <body>
            <section>
               <h1>file 2</h1>
            </section>
         </body>
      </body>
   `
;

/** == [ exports ]
    * == == == == == == == == == */
export default function PrintTestView( { ...props } ) {

   return( <>
      <View style={ s.sheet }>
         <Button title="print" onPress={ () => { PrintFile( { html: file2 } ); } }/>
         <Button title="printNShare" onPress={ () => { PrintFileNShare( { html: file2 } ); } }/>
      </View>
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
         gap: 25,
         backgroundColor: "#212329",
      },
   } )
;