

/** == [ @imports ] 
 * == == == == == == == == == */
import React, { useState, useEffect } from "react";
import { 
   StyleSheet,
   View,
   Text,
   Button,
   Pressable, 
} from "react-native";
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
type Props = {
   html: string;
   title?: string;
   bg?: string;
}

/** == [ exports ]
    * == == == == == == == == == */
export default function PrintFile( { ...props }: Props ) {
   async function prints() {
      await expoPrint.printAsync(
         { html: props.html }
      );
   }  
   
   async function printNShare() {
      try {
         const 
            { uri } = await expoPrint.printToFileAsync( { html: props.html } );
         ;
         
         await shareAsync( uri, { UTI: ".pdf", mimeType: "application/pdf" } );
         
      } catch( err: any ) { console.log( "printNShare() err: ", err ); }
   }

   return( <>
      <Pressable style={ s.btnCover } onPress={ () => { prints(); } }>
         <View style={[ s.btn, { backgroundColor: props.bg || "#2af" } ]}>
            <Text style={[ s.title, ]}>{ props.title || "print" }</Text>
         </View>
      </Pressable>
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
      btnCover: {
         width: "100%",
         padding: 16,
         backgroundColor: "#fff1",
      },
      btn: {
         width: "100%",
         height: 56,
         borderRadius: 13,
         alignItems: "center",
         justifyContent: "center",
      },
      title: {
         color: "#333",
         fontWeight: 800,
         textAlign: "center",
         fontSize: 18,
      },
   } )
;