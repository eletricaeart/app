

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
export default async function PrintFile( { ...props } ) {
   await expoPrint.printAsync(
      { html: props.html }
   );
}  
   
//    async function printNShare() {
//       try {
//          const 
//             { uri } = await expoPrint.printToFileAsync( { html } );
//          ;
         
//          await shareAsync( uri, { UTI: ".pdf", mimeType: "application/pdf" } );
         
//       } catch( err: any ) { console.log( "printNShare() err: ", err ); }
//    }

//    return( <>
//       <View style={ s.sheet }>
//          <Button title="print" onPress={ () => { print(); } }/>
//          <Button title="printNShare" onPress={ () => { printNShare(); } }/>
//       </View>
//    </> );
// }


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