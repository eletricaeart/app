

/** == [ @imports ] 
 * == == == == == == == == == */
import { BackBtn, BackBtnTxt, Btn, BtnTxt, Input, Label, LabelText, PP, Section } from "@/src/widgets/ui";
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

import { Link, router, } from "expo-router";

import * as CStore from "@/src/widgets/clb-dbs";
import { AppbarStick, BackButton, } from "@/src/widgets/ui";
import { FirebaseApp, FirebaseAuth, SaveDataOnFbRDB,  } from "@/FirebaseConfig";
import { 
   signInWithEmailAndPassword, 
   createUserWithEmailAndPassword,
   onAuthStateChanged,
   User,
   getAuth, 
   signOut,
} from "firebase/auth";
import { get, child, ref, getDatabase } from "firebase/database";
import ResetStorage from "@/src/services/resetStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AniButton } from "@/src/widgets/ui/animated";


/** == [ properties ]
 * == == == == == == == == == */


/** == [ exports ]
 * == == == == == == == == == */
export default function SignInView( { ...props } ) {
   const 
      [ User, setUser ] = useState<User | null>( null )
      ,
      [ Email, setEmail ] = useState( "" )
      ,
      [ Password, setPassword ] = useState( "" )
      ,
      [ Loading, setLoading ] = useState( false )

   ;

   useEffect( () => {
      onAuthStateChanged( FirebaseAuth, user => {
         async function load() {
            try{
               if( user ) {
                  const jsn = JSON.stringify( user );
                  await AsyncStorage.setItem( "user", jsn );
                  setUser( user );
                  return user; 
               }
            } catch( err: any ) { console.log( "onAuthStateChanged useEffect err: ", err ) }

         }
         load().then( r => console.log( "onAuthStateChanged useEffect user: ", user ) );
         console.log( "onAuthStateChanged() signup: ", User );
         // setUser( User ); 
      } );
   }, [] ); 


   useEffect( () => {
      if( User ) {
         // router.replace( "/home" );
         router.replace( "/(drawer)" );
      }
      console.log( "User exist, so changing signin to /drawer::1" );
   }, [User] );

   async function HandleSignIn() {
      setLoading( true );

      async function handleOldStoredData() {
         // if user exist on localStorage
         // check user.email and email input
         // if doesn't match: old localStorage data is reseted 
         async function handle() {
            try {
               const 
                  userJson = await AsyncStorage.getItem( "user" )
                  ,   
                  oldUser = JSON.parse( userJson )
               ;
               
               console.log( "here oldUser: ", oldUser );
               return oldUser;
            } catch( err: any ) {
               console.error( "handleOldStoredData() err: \n\n\n", err );
            }
         }

         if( await AsyncStorage.getItem( "user" ) ) {
            handle().then( r => {
               if( r.email != Email ) {
                  ResetStorage();
               } 
            } )
         }
      }
      
      async function Handle() {
         // signIn user and return { userData and userUid }
         try {
            const 
               response = await signInWithEmailAndPassword( FirebaseAuth, Email, Password )
               ,
               userUid = response.user.uid
               ,
               userEmail = response.user.email
            ;

            console.log( "SigIn() response: \n\n\n", response );
            
            return { response, userUid, userEmail };
         }
         catch( err: any ) {
            console.log( "SignIn() err: \n\n\n", err );
            alert( `Não consegui fazer seu login!\naconteceu esse erro aqui: ${ err.code }\n${ err.message }` );
         }
         finally {
            setLoading( false );
         }
      }

      await handleOldStoredData();

      await Handle().then( returned => {
         async function CreateUserSpace() {
            try {
               const 
                  userData = {
                     name: getAuth().currentUser.displayName,
                     displayName: getAuth().currentUser.displayName,
                     // uid: returned?.user.uid,
                     uid: returned?.userUid,
                     email: returned?.response.user.email,
                  }
                  ,
                  userJson = JSON.stringify( userData )
               ;
               await CStore.StoreData( userJson, "user" );

               console.log( "HandleSignIn() CreateUserSpace(): userData", userData );
               
               return returned.response;
            } catch( err: any ) { console.log( "CreateUserSpace() err: ", err ); }
         }
         CreateUserSpace().then( r => setUser( r ) );
      } );
   }

   return( <>
      <AppbarStick>
         <BackButton />
      </AppbarStick>
      <View style={ s.root }>
         <ImageBackground source={ require( "@/src/images/bgs/splash-login-720x1600.png" ) } resizeMode="stretch" style={ s.bgImage }>
            <View style={ [ s.rootB ]}>
               <View style={[ s.vv ]}>
                  <Image source={ require( "@/src/images/EA/globo-de-plasma-700.png" ) } style={ s.vvImage }/>
               </View>

            
               {/* <KeyboardAvoidingView behavior="position" style={[ { width: "80%", } ]}> */}
               <View style={[ { width: "80%", } ]}>

                  <Label>
                     <LabelText style={{ color: "#fff", textShadowColor: "#daa520", textShadowRadius: 5  }}>Email</LabelText>
                     <Input 
                        placeholder="Email"
                        value={ Email }
                        onChangeText={ ( text ) => setEmail( text ) }
                        inputMode="email"
                        autoCapitalize="none"
                        cursorColor={ "#00559C" }
                     />
                  </Label>
                  <Label>
                     <LabelText style={{ color: "#fff", textShadowColor: "#daa520", textShadowRadius: 5  }}>Password</LabelText>
                     <Input 
                        placeholder="Password"
                        secureTextEntry={ true }
                        value={ Password }
                        onChangeText={ ( text ) => setPassword( text ) }
                        inputMode="text"
                        autoCapitalize="none"
                        cursorColor={ "#00559C" }
                     />
                  </Label>
               {/* </KeyboardAvoidingView>  */}
               </View> 

               <View style={ s.footer }>
                  {
                     Loading ? (
                        <ActivityIndicator size="large" color="#00559c"/> 
                     ) : ( 
                        <Section style={{ gap: 16, width: "80%", }}>
                        
                           <AniButton title="Login"
                              animation="bounceInDown"
                              bg="#212329"
                              onPress={ () => { HandleSignIn() } }
                           />

                        </Section> 
                     )
                  }
               </View>
               <Text style={{ textAlign: "center", color: "#eee",  }}>
                  Ainda não tem uma conta? registre-se 
                  <Link href="/signup" style={{ textDecorationLine: "underline" }}> aqui</Link> 
               </Text>
            </View>
         </ImageBackground>
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
      // backgroundColor: "#270"
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