

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
   items = [
      "1", "2", "3", "4", "5", "6", "7", "8", "9",
      "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a",
      "1b", "2b", "3b", "4b", "5b", "6b", "7b", "8b", "9b",
      "1c", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c",
      "1c", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c",
      "1d", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d",
      "1e", "2e", "3e", "4e", "5e", "6e", "7e", "8e", "9e",
      "1f", "2f", "3f", "4f", "5f", "6f", "7f", "8f", "9f",
      "1g", "2g", "3g", "4g", "5g", "6g", "7g", "8g", "9g",
      "1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h",
      "1i", "2i", "3i", "4i", "5i", "6i", "7i", "8i", "9i",
   ],
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
            <style>
               deck {
                  display: block;
                  width: 90%;
                  heght: 50vh;
                  padding: 2em;
               }
            </style>
         </head>
         <body>
            <section>
               <h1>file 2</h1>
            </section>
            <section>
               ${ items.map( item => `
                  <deck>
                     <h1>item ${ item }</h1>
                  </deck>
               ` ) }
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
            html={ file2 }
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