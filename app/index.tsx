

import React, {
   useState, useEffect,
} from "react";

import {
   StyleSheet,
   View, Text,
   TextInput,
   Pressable,
   KeyboardAvoidingView, /* Button, */
} from "react-native";

import { ActivityIndicator, Button } from "react-native-paper";

import { router } from "expo-router";
import TabLayout from "@/app/(tabs)/_layout";

import { FirebaseAuth } from "@/FirebaseConfig";
import { 
   signInWithEmailAndPassword, 
   createUserWithEmailAndPassword,
   onAuthStateChanged,
   User, 
} from "firebase/auth";

import { Press } from "@/assets/modules/clb-modules";


export default function Index() {
   const 
      [ User, setUser ] = useState<User | null>( null )
      ,
      [ Email, setEmail ] = useState( "" )
      ,
      [ Password, setPassword ] = useState( "" )
      ,
      [ Loading, setLoading ] = useState( false )
      ,
      auth = FirebaseAuth
      ,
      SignIn = async () => {
         setLoading( true );
         try {
            const 
               response = await signInWithEmailAndPassword( auth, Email, Password )
            ;

            console.log( "SigIn() response: \n\n\n", response );
         }
         catch( err: any ) {
            console.log( "SignIn() err: \n\n\n", err );
            alert(
               `Não consegui fazer seu login!\naconteceu esse erro aqui: \n${ err.message }`
            );
         }
         finally {
            setLoading( false );
         }
      }
      ,
      SignUp = async () => {
         setLoading( true );
         try {
            const 
               response = await createUserWithEmailAndPassword( auth, Email, Password )
            ;

            console.log( "SigUp() response: \n\n\n", response );
         }
         catch( err: any ) {
            console.log( "SignUp() err: \n\n\n", err );
            alert(
               `Não consegui fazer seu cadastro!\ndeu esse erro aqui: \n${ err.message }`
            );
         }
         finally {
            setLoading( false );
         }
      }
   ;

   useEffect( () => {
      onAuthStateChanged( FirebaseAuth, user => {
         console.log( { User } );
         setUser( User ); 
      } );
   }, [] );

   return( <>
      { !User ? 
      (
         <View style={ s.root } >
            <KeyboardAvoidingView behavior="padding" style={ [ s.root, { width: "100%", } ]}>
               <Text style={ s.tt }>Login Page</Text>
            
               <View style={ s.form }>
                  <View style={ s.Label }>
                     <Text style={ s.label }>Email</Text>
                     <TextInput 
                     style={ s.input }
                     placeholder="Email"
                     value={ Email }
                     onChangeText={ ( text ) => setEmail( text ) }
                     keyboardType="email-address"
                     />
                  </View>
                  <View style={ s.Label }>
                     <Text style={ s.label }>Password</Text>
                     <TextInput 
                     style={ s.input }
                     placeholder="Password"
                     secureTextEntry={ true }
                     value={ Password }
                     onChangeText={ ( text ) => setPassword( text ) }
                     keyboardType="default"
                     />
                  </View>
               </View>
               <View style={ s.footer }>
                  {
                     Loading ? (
                        <ActivityIndicator 
                        size="large" color="#fc0fc0"
                        /> )
                        : 
                        ( <>
                           <Press text="Login" onPress={ SignIn } style={ s. btn } />
                           <Press text="Se Cadastrar" onPress={ SignUp } style={ s. btn } />
                        </> )
                  }
               </View>
            </KeyboardAvoidingView>
         </View>
      )
      : 
      (
         <TabLayout />
         /* <BottomNavigationBar /> */
      ) }
   </> );
}

const 
   s = StyleSheet.create( {
      root: {
         flex: 1,
         alignItems: "center",
         justifyContent: "center",
         // backgroundColor: "#270"
      },
      tt: {
         fontSize: 24,
         fontWeight: "bold",
         marginBottom: 24,
      },
      form: {
         backgroundColor: "#e5e5e5",
         width: "90%",
         borderRadius: 13,
         paddingBottom: 18,
      },
      label: {
         fontSize: 14,
         color: "#777",
         paddingLeft: 14,
      },
      input: {
         borderRadius: 13,
         borderColor: "#7777",
         borderWidth: 1,
         paddingLeft: 14,
         paddingRight: 14,
         paddingTop: 8,
         paddingBottom: 8,
      },
      Label: {
         padding: 16,   
      },
      footer: {
         margin: 16,
         gap: 16,
      },
      btn: {
         width: "50%",
      },
   } )
;