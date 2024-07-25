

import React, {
   useState, useEffect,
} from "react";

import {
   View, Text,
} from "react-native";

import { FirebaseAuth } from "@/FirebaseConfig";



export default function Login() {
   const 
      [ Email, setEmail ] = useState( "" )
      ,
      [ Password, setPassword ] = useState( "" )
      ,
      [ Loading, setLoading ] = useState( false )
      ,
      auth = FirebaseAuth;
   ;

   return( <>
      <View>
         <Text>Login Page</Text>
      </View>
   </> );
}