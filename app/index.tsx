

import React, {
   useState, useEffect,
} from "react";

import {
   StyleSheet,
   View, Text,
   TextInput,
   Pressable,
   KeyboardAvoidingView,
   ImageBackground,
} from "react-native";

import { ActivityIndicator, Button } from "react-native-paper";

import { router } from "expo-router";
import TabLayout from "@/app/(tabs)/_layout";

import * as CStore from "@/assets/modules/clb-dbs";
import { colors } from "@/assets/modules/clb-colors";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { FirebaseApp, FirebaseAuth,  } from "@/FirebaseConfig";
import { 
   signInWithEmailAndPassword, 
   createUserWithEmailAndPassword,
   onAuthStateChanged,
   User,
   getAuth, 
   signOut,
} from "firebase/auth";
import { firebase } from "@react-native-firebase/database";

import {
   BtnSquare01,
} from "@/assets/modules/clb-svg";


export default function Index() {
   const 
      // bgImage = require( "@/assets/images/bgs/bg_09.jpeg" )
      // ,
      [ User, setUser ] = useState<User | null>( null )
      ,
      [ Email, setEmail ] = useState( "" )
      ,
      [ Password, setPassword ] = useState( "" )
      ,
      [ Loading, setLoading ] = useState( false )
      ,
      [ IsLogin, setIsLogin ] = useState( true )
      ,
      auth = FirebaseAuth
      ,
      SignIn = async () => {
         let userCredential = {};

         setLoading( true );
         try {
            const 
               response = await signInWithEmailAndPassword( auth, Email, Password )
            ;

            console.log( "SigIn() response: \n\n\n", response );
            userCredential = { ...response };
         }
         catch( err: any ) {
            console.log( "SignIn() catch err: \n\n\n", err );
            alert(
               `Não consegui fazer seu login!\naconteceu esse erro aqui: \n${ err.message }`
            );
         }
         finally {
            console.log( `finally UserCredential: \n\n\n`, userCredential );

            if( User ) {
               const json = JSON.stringify( User );
               await AsyncStorage.setItem( "User", json );   
               
            } else {
               console.log( "{ empty }" );
            }

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
            alert( `Deu ruim no cadastro!\n\ncódigo do erro: ${ err.code }\n${ err.message }` );
         }
         finally {
            setLoading( false );
         }
      }
      ,
      SaveUser2DBs = async () => {
         try {
            const 
               data = JSON.stringify( User )
            ;
            await AsyncStorage.setItem( "User", data );
            
            console.log( "SaveUser2DBs() User: \n\n\n", User );
            alert( `SaveUser2DBs() User: \n\n\n ${ User }` );
            
            alert( "Bem Vindo" );
            
         } catch( err ) {
            console.log( "\n\n== == == == == ==\nSaveUser2DBs() saving error: \n", err );
         }
      }
   ;




   useEffect( () => {
      onAuthStateChanged( FirebaseAuth, User => {
         console.log( "aqui[]: ", User );
         setUser( User ); 
      } );
   }, [] );

   useEffect( () => {
      async function load() {
         if( User ) {
            const jsn = JSON.stringify( User );
            await AsyncStorage.setItem( "User", jsn );
         }
      }
      load();
   }, [ User ] );

   // firebase.database().ref( "users" ).child( value.user.uid ).set( { name: name } );


   return( <>
      { !User ? 
      (
         <View style={ s.root } >
            {/* <ImageBackground source={ bgImage } resizeMode="cover" style={ s.bgImage }> */}
               <KeyboardAvoidingView behavior="padding" style={ [ s.root, { width: "100%", } ]}>
                  <Text style={ s.tt }>
                     { IsLogin ? "Entre" : "Cadastre-se" }
                  </Text>
               

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
                  <View style={ s.footer } className="bg-slate-500">
                     {
                        Loading ? (
                           <ActivityIndicator 
                           size="large" color="#00559c"
                           /> )
                           : 
                           ( <>
                              <Pressable style={{ elevation: 10, width: "100%", }} onPress={ SignIn }>
                                 <BtnSquare01 fill="#00559c" bg="#fff0">
                                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff", }}>
                                       Entrar
                                    </Text>
                                 </BtnSquare01> 
                              </Pressable>

                              <Pressable style={{ elevation: 10, width: "100%", }} onPress={ SignUp }>
                                 <BtnSquare01 fill={ colors.blue2 } bg="#fff0">
                                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff",  }}>
                                       Se Registrar
                                    </Text>
                                 </BtnSquare01> 
                              </Pressable>

                              {/* <Press text="Login" onPress={ SignIn } style={ s. btn } />
                              <Press text="Se Cadastrar" onPress={ SignUp } style={ s. btn } /> */}
                           </> )
                     }
                  </View>
               </KeyboardAvoidingView>
            {/* </ImageBackground> */}
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
      bgImage: {
         flex: 1,
         alignItems: "center",
         justifyContent: "center",
         // backgroundColor: "#270"
         width: "100%",
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
         // backgroundColor: "#fc0",
         width: "100%",
         margin: 16,
         padding: 16,
         gap: 16,
         alignItems: "center",
      },
      btn: {
         // width: "50%",
         elevation: 1,
      },
   } )
;