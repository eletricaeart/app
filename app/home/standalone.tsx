

/** == [ @imports ] 
 * == == == == == == == == == */
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import { 
   StyleSheet,
   View,
   Text,
   TouchableOpacity, 
   Dimensions,
   ScrollView,
   Button,
} from "react-native";


/** == [ properties ]
 * == == == == == == == == == */
const { width, height } = Dimensions.get( "window" );
const COLORS = [
   "#16181c",
   "#1B1D22",
   "#212329",
   "#e5e5e5",
   "#f5f5f5",
   "#fff",
   "#ffab00",
   "#27f",
   "#29f",
   "#905",
   "#fc0fc0",
   "#fc0",
]

/** == [ exports ]
 * == == == == == == == == == */
export default function Standalone( { ...props } ) {


   return( <>
      <View style={{ padding: 18, }}>
         <Text>Standalone</Text>
      </View>
      <View style={ s.sheet }>
         <ScrollView style={{ width: "100%", }}>
            <View style={{
               flexDirection: "row", flexGrow: 1, flexWrap: "wrap", justifyContent: "center", padding: 8, gap: width * .03,
            }}>
               {
                  COLORS.map( color => (
                     <TouchableOpacity
                        key={ color }
                        style={{
                           backgroundColor: color,
                           width: width * .29,
                           height: width * .29, 
                           borderRadius: 5,
                           alignItems: "center",
                           justifyContent: "center",
                           
                        }}
                     >
                        <Text style={{ 
                           color: color.replace("#", "").split("").concat("#").reverse().join("")
                        }}>
                           { color }
                        </Text>
                     </TouchableOpacity>
                  ) )
               }
            </View>
            <View>
               <Link href={"/home/home"} asChild>
                  <Text>Goto Home</Text>
               </Link>
            </View>
         </ScrollView>
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
      },
   } )
;