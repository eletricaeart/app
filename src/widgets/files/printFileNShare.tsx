

/** == [ @imports ] 
 * == == == == == == == == == */
// import React, { useState, useEffect } from "react";
// import { 
//    StyleSheet,
//    View,
//    Text,
//    Button, 
// } from "react-native";
import * as expoPrint from "expo-print";
import { shareAsync } from "expo-sharing";


/** == [ properties ]
 * == == == == == == == == == */
// const 
//    html = `
//    <html>
//       <head>
//       </head>
//       <body>
//          <section>
//             <h1>Céo</h1>
//          </section>
//       </body>
//    </body>
//    `
// ;

/** == [ exports ]
    * == == == == == == == == == */
export default async function PrintFileNShare( { ...props } ) {
   try {
      const 
         { uri } = await expoPrint.printToFileAsync( { html: props.html } );
      ;
      
      await shareAsync( uri, { UTI: ".pdf", mimeType: "application/pdf" } );
      
   } catch( err: any ) { console.log( "PrintFileNShare() err: ", err ); }
}


/** == [ StyleSheet ]
 * == == == == == == == == == */
// const 
//    s = StyleSheet.create( {
//       sheet: {
//          flex: 1,
//          alignItems: "center",
//          justifyContent: "center",
//       },
//    } )
// ;