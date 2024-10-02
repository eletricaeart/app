

/** == [ @imports ] 
 * == == == == == == == == == */
import { Btn, BtnTxt, Input, Label, LabelText, Section } from "@/src/widgets/ui";
import React, { useState, useEffect } from "react";
import { 
   StyleSheet,
   View,
   Text,
   ImageBackground,
   Image,
   KeyboardAvoidingView,
   Pressable, 
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { 
   Text as Txt,
   View as ViewA,
} from "react-native-animatable";
import { Link, router, } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { FirebaseApp, FirebaseAuth, SaveDataOnFbRTDB,  } from "@/FirebaseConfig";
import { 
   signInWithEmailAndPassword, 
   createUserWithEmailAndPassword,
   onAuthStateChanged,
   User,
   getAuth, 
   signOut,
} from "firebase/auth";
import { get, child, ref, getDatabase } from "firebase/database";
import { AniButton } from "@/src/widgets/ui/animated";

/** == [ properties ]
 * == == == == == == == == == */


/** == [ exports ]
 * == == == == == == == == == */
export default function Landing( { ...props } ) {
   const 
      // [ User, setUser ] = useState<User | null>( null ),
      [ User, setUser ] = useState<User | null>(),
      [ Loading, setLoading ] = useState( false )

   ;

   useEffect( () => {
      onAuthStateChanged( FirebaseAuth, User => {
         console.log( "onAuthStateChanged() landing: ", User );
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

   if( User ) {
      router.replace( "/home" ); 
   } 
      return <Returned/>;
      
      function Returned() {
         return( <>
            <View style={ s.root }>
               <ImageBackground source={ require( "@/src/images/bgs/splash-login-720x1600.png" ) } resizeMode="stretch" style={ s.bgImage }>
                  <View style={ [ s.rootB ]}>
                     <ViewA animation="bounceIn" style={[ s.vv ]}>
                        <Image source={ require( "@/src/images/EA/globo-de-plasma-700.png" ) } style={ { height: "100%", resizeMode: "contain", } }/>
                     </ViewA>
      
                     {/* <Txt animation="zoomInUp">Welcome landing view</Txt> */}
                  
                     {/* <KeyboardAvoidingView behavior="position" style={[ { width: "80%", } ]}>
                     </KeyboardAvoidingView>  */}
      
                     <View style={ s.footer }>
                        {
                           Loading ? (
                              <ActivityIndicator size="large" color="#00559c"/> 
                           ) : ( 
                              <Section style={{ width: "80%", }}>


                                 <AniButton title="acessar sua conta"
                                    animation="bounceInDown"
                                    bg="#212329"
                                    onPress={ () => {
                                       router.push( "/signin" )
                                    } }
                                 />
                                 <AniButton title="Criar uma conta"
                                    // animation="bounceInDown"
                                    bg="#00559c"
                                    onPress={ () => {
                                       router.push( "/signup" )
                                    } }
                                 />
      
                              </Section> 
                           )
                        }
                     </View>
                     <Text style={{ textAlign: "center", color: "#eee", }}>
                        Ao se registrar, você concorda com a nossa{"\n"}
                        <Text style={{ textDecorationLine: "underline" }}>política de privacidade </Text> 
                        e os 
                        <Text style={{ textDecorationLine: "underline" }}> termos de uso</Text>
                     </Text>
                  </View>
               </ImageBackground>
            </View>
         </> );
      }
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
   root: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      // backgroundColor: "#270"
   },
   rootB: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%", backgroundColor: "#fc0fc000", 
   },
   bgImage: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
   },
   vv: { 
      backgroundColor: "#21232955", 
      // height: 180, 
      height: "25%", 
      aspectRatio: 1, 
      alignItems: "center", 
      justifyContent: "center", 
      marginTop: 56, 
      marginBottom: 56,
      padding: 0,
      borderRadius: 1000, 
      elevation: 15,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 0
      }
   },
   vvImage: { 
      height: "100%", 
      // resizeMode: "contain",
      resizeMode: "center",
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
      // paddingLeft: 14,
      paddingLeft: 6,
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