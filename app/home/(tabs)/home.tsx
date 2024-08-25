

/** == [ @imports ] 
 * == == == == == == == == == */
import { Homepage, P } from "@/src/widgets/ui";
import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import { 
   StyleSheet,
   View,
   Text, 
} from "react-native";


/** == [ properties ]
 * == == == == == == == == == */


/** == [ exports ]
 * == == == == == == == == == */
export default function HomeView( { ...props } ) {


   return( <>
      <Homepage>
         <P>Home page</P>
         <Link href={"/home/standalone"}>Standalone</Link>
      </Homepage>
   </> );
}