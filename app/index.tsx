

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
   Image,
} from "react-native";

import { BlurView } from 'expo-blur';


import { ActivityIndicator, Button } from "react-native-paper";

import { router } from "expo-router";
import TabLayout from "@/app/(tabs)/_layout";

import * as CStore from "@/src/widgets/clb-dbs";
import { colors } from "@/src/widgets/clb-colors";

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
} from "@/src/widgets/clb-svg";


export default function Index() {
   const 
      // bgImage = require( "@/src/images/bgs/bg_09.jpeg" )
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
            {/* <ImageBackground source={ require( "@/src/images/bgs/1wNXXu1b.jpeg" ) } resizeMode="cover" style={ s.bgImage }> */}
            {/* <ImageBackground source={ require( "@/src/images/bgs/Dark Phone Wallpapers.jpeg" ) } resizeMode="cover" style={ s.bgImage }> */}
            {/* <ImageBackground source={ require( "@/src/images/bgs/F8Sesbci.jpeg" ) } resizeMode="cover" style={ s.bgImage }> */}
            {/* <ImageBackground source={ require( "@/src/images/bgs/tAeAw3a7.jpeg" ) } resizeMode="cover" style={ s.bgImage }> */}
            {/* <ImageBackground source={ require( "@/src/images/bgs/1wNXXu1b.jpeg" ) } resizeMode="cover" style={ s.bgImage }> */}
            <ImageBackground source={ require( "@/src/images/bgs/1wNXXu1sdv.png" ) } resizeMode="cover" style={ s.bgImage }>
               <KeyboardAvoidingView behavior="padding" style={ [ s.root, { width: "100%", backgroundColor: "#fc0fc000", alignItems: "center", justifyContent: "flex-start", } ]}>

                  <View  style={{ backgroundColor: "#fc00", width: "100%", height: "25%", alignItems: "center", justifyContent: "center", marginTop: 56, marginBottom: 56, }}>
                     {/* <Image source={ require( "@/src/images/EA/EA-login-logo.png" ) } style={ { width: "40%", resizeMode: "contain", } }/> */}
                     {/* <Image source={ require( "@/src/images/EA/EA logo 123.png" ) } style={ { width: "90%", resizeMode: "contain", } }/> */}
                     <Image source={ require( "@/src/images/EA/globo-de-plasma-700.png" ) } style={ { height: "100%", resizeMode: "contain", } }/>
                  </View>
               
                  {/* <Text style={ s.tt }>
                     { IsLogin ? "Entre" : "Cadastre-se" }
                  </Text> */}

               {/* <BlurView intensity={ 30 } style={ s.formBlur }> */}
                  <View style={[ s.form, { backgroundColor: "#fff5", borderColor: "#fff", borderWidth: 2, } ]}>

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

               {/* </BlurView> */}
                  <View style={ s.footer }>
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

                           </> )
                     }
                  </View>
               </KeyboardAvoidingView>
            </ImageBackground>
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
      formBlur: {
         // backgroundColor: "#e5e5e5",
         width: "90%",
         borderRadius: 13,
         paddingBottom: 18,
         alignItems: "center",
         justifyContent: "center",
         overflow: "hidden",
      },
      label: {
         fontSize: 16,
         // color: "#160767",
         color: "#fff",
         fontWeight: "bold",
         paddingLeft: 14,
      },
      input: {
         borderRadius: 13,
         backgroundColor: "#fff9",
         borderColor: "#7777",
         borderWidth: 1,
         paddingLeft: 14,
         paddingRight: 14,
         paddingTop: 8,
         paddingBottom: 8,
         color: "#000",
      },
      Label: {
         padding: 16, 
         gap: 7, 
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