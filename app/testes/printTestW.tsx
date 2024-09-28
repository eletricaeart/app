

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
// import PrintFile from "@/src/widgets/functional/printFile";
// import PrintFileNShare from "@/src/widgets/functional/printFileNShare";
import PrintFile from "@/src/widgets/files/printFile";
import PrintFileNShare from "@/src/widgets/functional/printFileNShare";
// import PrintFileNShare from "@/src/widgets/files/printFileNShare";


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
      <View
         style={{
            backgroundColor: "#16181c",
            width: "100%",
            height: 63,
            borderBottomColor: "#1b1d22",
            borderBottomWidth: 2,
            elevation: 3,
            alignItems: "center",
            justifyContent: "center",
         }}
      >
         <Text style={{ color: "#daa520", fontWeight: 700, fontSize: 22, }}>expo-print</Text>
      </View>
      <View style={ s.sheet }>
         <PrintFile 
            html={ file1 }
            // title="Arquivo 1"
            // bg="#daa520"
         />
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